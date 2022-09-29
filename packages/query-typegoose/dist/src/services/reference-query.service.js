"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceQueryService = void 0;
/* eslint-disable no-underscore-dangle */
const core_1 = require("@nestjs-query/core");
const typegoose_1 = require("@typegoose/typegoose");
const common_1 = require("@nestjs/common");
const query_1 = require("../query");
const typegoose_types_helper_1 = require("../typegoose-types.helper");
class ReferenceQueryService {
    constructor(Model) {
        this.Model = Model;
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregateQuery) {
        var _a;
        this.checkForReference('AggregateRelations', relationName);
        const relationModel = this.getReferenceModel(relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        if (Array.isArray(dto)) {
            return dto.reduce(async (mapPromise, entity) => {
                const map = await mapPromise;
                const refs = await this.aggregateRelations(RelationClass, relationName, entity, filter, aggregateQuery);
                return map.set(entity, refs);
            }, Promise.resolve(new Map()));
        }
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, this.getReferenceEntity(relationName));
        const refFilter = this.getReferenceFilter(relationName, dto, assembler.convertQuery({ filter }).filter);
        if (!refFilter) {
            return [];
        }
        const { filterQuery, aggregate, options } = referenceQueryBuilder.buildAggregateQuery(assembler.convertAggregateQuery(aggregateQuery), refFilter);
        const aggPipeline = [{ $match: filterQuery }, { $group: aggregate }];
        if (options.sort) {
            aggPipeline.push({ $sort: (_a = options.sort) !== null && _a !== void 0 ? _a : {} });
        }
        const aggResult = (await relationModel.aggregate(aggPipeline).exec());
        return query_1.AggregateBuilder.convertToAggregateResponse(aggResult);
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        this.checkForReference('CountRelations', relationName);
        if (Array.isArray(dto)) {
            return dto.reduce(async (mapPromise, entity) => {
                const map = await mapPromise;
                const refs = await this.countRelations(RelationClass, relationName, entity, filter);
                return map.set(entity, refs);
            }, Promise.resolve(new Map()));
        }
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, this.getReferenceEntity(relationName));
        const relationModel = this.getReferenceModel(relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        const refFilter = this.getReferenceFilter(relationName, dto, assembler.convertQuery({ filter }).filter);
        if (!refFilter) {
            return 0;
        }
        return relationModel.countDocuments(referenceQueryBuilder.buildFilterQuery(refFilter)).exec();
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        this.checkForReference('FindRelation', relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        if (Array.isArray(dto)) {
            return dto.reduce(async (prev, curr) => {
                const map = await prev;
                const ref = await this.findRelation(RelationClass, relationName, curr, opts);
                return map.set(curr, ref);
            }, Promise.resolve(new Map()));
        }
        // eslint-disable-next-line no-underscore-dangle
        const foundEntity = await this.Model.findById(dto._id);
        if (!foundEntity) {
            return undefined;
        }
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, this.getReferenceEntity(relationName));
        const filterQuery = referenceQueryBuilder.buildFilterQuery(assembler.convertQuery({ filter: opts === null || opts === void 0 ? void 0 : opts.filter }).filter);
        const populated = await foundEntity.populate({ path: relationName, match: filterQuery }).execPopulate();
        const populatedRef = populated.get(relationName);
        return populatedRef ? assembler.convertToDTO(populatedRef) : undefined;
    }
    async queryRelations(RelationClass, relationName, dto, query) {
        var _a;
        this.checkForReference('QueryRelations', relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        if (Array.isArray(dto)) {
            return dto.reduce(async (mapPromise, entity) => {
                const map = await mapPromise;
                const refs = await this.queryRelations(RelationClass, relationName, entity, query);
                return map.set(entity, refs);
            }, Promise.resolve(new Map()));
        }
        const foundEntity = await this.Model.findById((_a = dto._id) !== null && _a !== void 0 ? _a : dto.id);
        if (!foundEntity) {
            return [];
        }
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, this.getReferenceEntity(relationName));
        const { filterQuery, options } = referenceQueryBuilder.buildQuery(assembler.convertQuery(query));
        const populated = await foundEntity.populate({ path: relationName, match: filterQuery, options }).execPopulate();
        return assembler.convertToDTOs(populated.get(relationName));
    }
    async addRelations(relationName, id, relationIds, opts) {
        this.checkForReference('AddRelations', relationName, false);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to add to ${this.Model.modelName}`);
        }
        const entity = await this.findAndUpdate(id, opts === null || opts === void 0 ? void 0 : opts.filter, { $push: { [relationName]: { $each: relationIds } } });
        return entity;
    }
    async setRelations(relationName, id, relationIds, opts) {
        this.checkForReference('AddRelations', relationName, false);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to set on ${this.Model.modelName}`);
        }
        const entity = await this.findAndUpdate(id, opts === null || opts === void 0 ? void 0 : opts.filter, { [relationName]: relationIds });
        return entity;
    }
    async setRelation(relationName, id, relationId, opts) {
        this.checkForReference('SetRelation', relationName, false);
        const refCount = await this.getRefCount(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (refCount !== 1) {
            throw new Error(`Unable to find ${relationName} to set on ${this.Model.modelName}`);
        }
        const entity = await this.findAndUpdate(id, opts === null || opts === void 0 ? void 0 : opts.filter, { [relationName]: relationId });
        // reload the document
        return entity;
    }
    async removeRelation(relationName, id, relationId, opts) {
        this.checkForReference('RemoveRelation', relationName, false);
        const refCount = await this.getRefCount(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (refCount !== 1) {
            throw new Error(`Unable to find ${relationName} to remove from ${this.Model.modelName}`);
        }
        await this.findAndUpdate(id, opts === null || opts === void 0 ? void 0 : opts.filter, { $unset: { [relationName]: relationId } });
        // reload the document
        return this.getById(id);
    }
    async removeRelations(relationName, id, relationIds, opts) {
        this.checkForReference('RemoveRelations', relationName, false);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to remove from ${this.Model.modelName}`);
        }
        if (this.isVirtualPath(relationName)) {
            throw new Error(`RemoveRelations not supported for virtual relation ${relationName}`);
        }
        await this.findAndUpdate(id, opts === null || opts === void 0 ? void 0 : opts.filter, { $pullAll: { [relationName]: relationIds } });
        // reload the document
        return this.getById(id);
    }
    getReferenceEntity(relationName) {
        const ReferenceModel = this.getReferenceModel(relationName);
        return (0, typegoose_1.getClass)(ReferenceModel.modelName);
    }
    isReferencePath(refName) {
        return !!this.Model.schema.path(refName);
    }
    isVirtualPath(refName) {
        return !!this.Model.schema.virtualpath(refName);
    }
    getReferenceFilter(refName, entity, filter) {
        if (this.isReferencePath(refName)) {
            return this.getObjectIdReferenceFilter(refName, entity, filter);
        }
        if (this.isVirtualPath(refName)) {
            const virtualType = this.Model.schema.virtualpath(refName);
            if ((0, typegoose_types_helper_1.isVirtualTypeWithReferenceOptions)(virtualType)) {
                return this.getVirtualReferenceFilter(virtualType, entity, filter);
            }
            throw new Error(`Unable to lookup reference type for ${refName}`);
        }
        return undefined;
    }
    getObjectIdReferenceFilter(refName, entity, filter) {
        const referenceIds = entity[refName];
        const refFilter = {
            _id: { [Array.isArray(referenceIds) ? 'in' : 'eq']: referenceIds },
        };
        return (0, core_1.mergeFilter)(filter !== null && filter !== void 0 ? filter : {}, refFilter);
    }
    getVirtualReferenceFilter(virtualType, entity, filter) {
        const { foreignField, localField } = virtualType.options;
        const refVal = entity[localField];
        const isArray = Array.isArray(refVal);
        const lookupFilter = {
            [foreignField]: { [isArray ? 'in' : 'eq']: refVal },
        };
        return (0, core_1.mergeFilter)(filter !== null && filter !== void 0 ? filter : {}, lookupFilter);
    }
    getReferenceModel(refName) {
        let refModel;
        if (this.isReferencePath(refName)) {
            const schemaType = this.Model.schema.path(refName);
            if ((0, typegoose_types_helper_1.isEmbeddedSchemaTypeOptions)(schemaType)) {
                refModel = (0, typegoose_1.getModelWithString)(schemaType.$embeddedSchemaType.options.ref);
            }
            else if ((0, typegoose_types_helper_1.isSchemaTypeWithReferenceOptions)(schemaType)) {
                refModel = (0, typegoose_1.getModelWithString)(schemaType.options.ref);
            }
        }
        else if (this.isVirtualPath(refName)) {
            const schemaType = this.Model.schema.virtualpath(refName);
            if ((0, typegoose_types_helper_1.isVirtualTypeWithReferenceOptions)(schemaType)) {
                refModel = (0, typegoose_1.getModelWithString)(schemaType.options.ref);
            }
        }
        if (!refModel) {
            throw new Error(`Unable to lookup reference type for ${refName}`);
        }
        return refModel;
    }
    getRefCount(relationName, relationIds, filter) {
        const referenceModel = this.getReferenceModel(relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        return referenceModel.countDocuments(referenceQueryBuilder.buildIdFilterQuery(relationIds, filter)).exec();
    }
    getReferenceQueryBuilder(refName) {
        return new query_1.FilterQueryBuilder(this.getReferenceModel(refName));
    }
    checkForReference(operation, refName, allowVirtual = true) {
        if (this.isReferencePath(refName)) {
            return;
        }
        if (this.isVirtualPath(refName)) {
            if (allowVirtual) {
                return;
            }
            throw new Error(`${operation} not supported for virtual relation ${refName}`);
        }
        throw new Error(`Unable to find reference ${refName} on ${this.Model.modelName}`);
    }
    async findAndUpdate(id, filter, query) {
        const entity = await this.Model.findOneAndUpdate(this.filterQueryBuilder.buildIdFilterQuery(id, filter), query, {
            new: true,
        }).exec();
        if (!entity) {
            throw new common_1.NotFoundException(`Unable to find ${this.Model.modelName} with id: ${id}`);
        }
        return entity;
    }
}
exports.ReferenceQueryService = ReferenceQueryService;
//# sourceMappingURL=reference-query.service.js.map