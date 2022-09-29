"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceQueryService = void 0;
/* eslint-disable no-underscore-dangle */
const core_1 = require("@nestjs-query/core");
const mongoose_1 = require("mongoose");
const query_1 = require("../query");
const mongoose_types_helper_1 = require("../mongoose-types.helper");
class ReferenceQueryService {
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
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, mongoose_1.Document);
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
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, mongoose_1.Document);
        const relationModel = this.getReferenceModel(relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        const refFilter = this.getReferenceFilter(relationName, dto, assembler.convertQuery({ filter }).filter);
        if (!refFilter) {
            return 0;
        }
        return relationModel.count(referenceQueryBuilder.buildFilterQuery(refFilter)).exec();
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        var _a;
        this.checkForReference('FindRelation', relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        if (Array.isArray(dto)) {
            return dto.reduce(async (prev, curr) => {
                const map = await prev;
                const ref = await this.findRelation(RelationClass, relationName, curr, opts);
                return map.set(curr, ref);
            }, Promise.resolve(new Map()));
        }
        const foundEntity = await this.Model.findById((_a = dto._id) !== null && _a !== void 0 ? _a : dto.id);
        if (!foundEntity) {
            return undefined;
        }
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, mongoose_1.Document);
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
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, mongoose_1.Document);
        const { filterQuery, options } = referenceQueryBuilder.buildQuery(assembler.convertQuery(query));
        const populated = await foundEntity.populate({ path: relationName, match: filterQuery, options }).execPopulate();
        return assembler.convertToDTOs(populated.get(relationName));
    }
    async addRelations(relationName, id, relationIds, opts) {
        this.checkForReference('AddRelations', relationName, false);
        const entity = await this.getById(id, opts);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to add to ${this.Model.modelName}`);
        }
        await entity.updateOne({ $push: { [relationName]: { $each: relationIds } } }).exec();
        // reload the document
        return this.getById(id);
    }
    async setRelations(relationName, id, relationIds, opts) {
        this.checkForReference('AddRelations', relationName, false);
        const entity = await this.getById(id, opts);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to set on ${this.Model.modelName}`);
        }
        await entity.updateOne({ [relationName]: relationIds }).exec();
        // reload the document
        return this.getById(id);
    }
    async setRelation(relationName, id, relationId, opts) {
        this.checkForReference('SetRelation', relationName, false);
        const entity = await this.getById(id, opts);
        const refCount = await this.getRefCount(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (refCount !== 1) {
            throw new Error(`Unable to find ${relationName} to set on ${this.Model.modelName}`);
        }
        await entity.updateOne({ [relationName]: relationId }).exec();
        // reload the document
        return this.getById(id);
    }
    async removeRelation(relationName, id, relationId, opts) {
        this.checkForReference('RemoveRelation', relationName, false);
        const entity = await this.getById(id, opts);
        const refCount = await this.getRefCount(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (refCount !== 1) {
            throw new Error(`Unable to find ${relationName} to remove from ${this.Model.modelName}`);
        }
        await entity
            .updateOne({
            $unset: { [relationName]: relationId },
        })
            .exec();
        // reload the document
        return this.getById(id);
    }
    async removeRelations(relationName, id, relationIds, opts) {
        this.checkForReference('RemoveRelations', relationName, false);
        const entity = await this.getById(id, opts);
        const refCount = await this.getRefCount(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (relationIds.length !== refCount) {
            throw new Error(`Unable to find all ${relationName} to remove from ${this.Model.modelName}`);
        }
        if (this.isVirtualPath(relationName)) {
            throw new Error(`RemoveRelations not supported for virtual relation ${relationName}`);
        }
        await entity
            .updateOne({
            $pullAll: { [relationName]: relationIds },
        })
            .exec();
        // reload the document
        return this.getById(id);
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
    isReferencePath(refName) {
        return !!this.Model.schema.path(refName);
    }
    isVirtualPath(refName) {
        return !!this.Model.schema.virtualpath(refName);
    }
    getReferenceQueryBuilder(refName) {
        return new query_1.FilterQueryBuilder(this.getReferenceModel(refName));
    }
    getReferenceModel(refName) {
        const { db } = this.Model;
        if (this.isReferencePath(refName)) {
            const schemaType = this.Model.schema.path(refName);
            if ((0, mongoose_types_helper_1.isEmbeddedSchemaTypeOptions)(schemaType)) {
                return db.model(schemaType.$embeddedSchemaType.options.ref);
            }
            if ((0, mongoose_types_helper_1.isSchemaTypeWithReferenceOptions)(schemaType)) {
                return db.model(schemaType.options.ref);
            }
        }
        else if (this.isVirtualPath(refName)) {
            const schemaType = this.Model.schema.virtualpath(refName);
            if ((0, mongoose_types_helper_1.isVirtualTypeWithReferenceOptions)(schemaType)) {
                return db.model(schemaType.options.ref);
            }
        }
        throw new Error(`Unable to lookup reference type for ${refName}`);
    }
    getReferenceFilter(refName, entity, filter) {
        if (this.isReferencePath(refName)) {
            return this.getObjectIdReferenceFilter(refName, entity, filter);
        }
        if (this.isVirtualPath(refName)) {
            const virtualType = this.Model.schema.virtualpath(refName);
            if ((0, mongoose_types_helper_1.isVirtualTypeWithReferenceOptions)(virtualType)) {
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
    getRefCount(relationName, relationIds, filter) {
        const referenceModel = this.getReferenceModel(relationName);
        const referenceQueryBuilder = this.getReferenceQueryBuilder(relationName);
        return referenceModel.count(referenceQueryBuilder.buildIdFilterQuery(relationIds, filter)).exec();
    }
}
exports.ReferenceQueryService = ReferenceQueryService;
//# sourceMappingURL=reference-query.service.js.map