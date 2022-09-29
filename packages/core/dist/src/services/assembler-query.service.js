"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblerQueryService = void 0;
class AssemblerQueryService {
    constructor(assembler, queryService) {
        this.assembler = assembler;
        this.queryService = queryService;
    }
    addRelations(relationName, id, relationIds, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.addRelations(relationName, id, relationIds, this.convertModifyRelationsOptions(opts)));
    }
    createMany(items) {
        const { assembler } = this;
        const converted = assembler.convertToCreateEntities(items);
        return this.assembler.convertAsyncToDTOs(this.queryService.createMany(converted));
    }
    createOne(item) {
        const c = this.assembler.convertToCreateEntity(item);
        return this.assembler.convertAsyncToDTO(this.queryService.createOne(c));
    }
    async deleteMany(filter) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.queryService.deleteMany(this.assembler.convertQuery({ filter }).filter);
    }
    deleteOne(id, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.deleteOne(id, this.convertFilterable(opts)));
    }
    async findById(id, opts) {
        const entity = await this.queryService.findById(id, this.convertFilterable(opts));
        if (!entity) {
            return undefined;
        }
        return this.assembler.convertToDTO(entity);
    }
    getById(id, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.getById(id, this.convertFilterable(opts)));
    }
    query(query) {
        return this.assembler.convertAsyncToDTOs(this.queryService.query(this.assembler.convertQuery(query)));
    }
    async aggregate(filter, aggregate) {
        const aggregateResponse = await this.queryService.aggregate(this.assembler.convertQuery({ filter }).filter || {}, this.assembler.convertAggregateQuery(aggregate));
        return aggregateResponse.map((agg) => this.assembler.convertAggregateResponse(agg));
    }
    count(filter) {
        return this.queryService.count(this.assembler.convertQuery({ filter }).filter || {});
    }
    async queryRelations(RelationClass, relationName, dto, query) {
        if (Array.isArray(dto)) {
            const entities = this.assembler.convertToEntities(dto);
            const relationMap = await this.queryService.queryRelations(RelationClass, relationName, entities, query);
            return entities.reduce((map, e, index) => {
                var _a;
                const entry = (_a = relationMap.get(e)) !== null && _a !== void 0 ? _a : [];
                map.set(dto[index], entry);
                return map;
            }, new Map());
        }
        return this.queryService.queryRelations(RelationClass, relationName, this.assembler.convertToEntity(dto), query);
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        if (Array.isArray(dto)) {
            const entities = this.assembler.convertToEntities(dto);
            const relationMap = await this.queryService.countRelations(RelationClass, relationName, entities, filter);
            return entities.reduce((map, e, index) => {
                var _a;
                const entry = (_a = relationMap.get(e)) !== null && _a !== void 0 ? _a : 0;
                map.set(dto[index], entry);
                return map;
            }, new Map());
        }
        return this.queryService.countRelations(RelationClass, relationName, this.assembler.convertToEntity(dto), filter);
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        if (Array.isArray(dto)) {
            const entities = this.assembler.convertToEntities(dto);
            const relationMap = await this.queryService.findRelation(RelationClass, relationName, entities, opts);
            return entities.reduce((map, e, index) => {
                map.set(dto[index], relationMap.get(e));
                return map;
            }, new Map());
        }
        return this.queryService.findRelation(RelationClass, relationName, this.assembler.convertToEntity(dto));
    }
    removeRelation(relationName, id, relationId, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.removeRelation(relationName, id, relationId, this.convertModifyRelationsOptions(opts)));
    }
    removeRelations(relationName, id, relationIds, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.removeRelations(relationName, id, relationIds, this.convertModifyRelationsOptions(opts)));
    }
    setRelations(relationName, id, relationIds, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.setRelations(relationName, id, relationIds, this.convertModifyRelationsOptions(opts)));
    }
    setRelation(relationName, id, relationId, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.setRelation(relationName, id, relationId, this.convertModifyRelationsOptions(opts)));
    }
    updateMany(update, filter) {
        return this.queryService.updateMany(this.assembler.convertToUpdateEntity(update), 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.assembler.convertQuery({ filter }).filter);
    }
    updateOne(id, update, opts) {
        return this.assembler.convertAsyncToDTO(this.queryService.updateOne(id, this.assembler.convertToUpdateEntity(update), this.convertFilterable(opts)));
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        if (Array.isArray(dto)) {
            const entities = this.assembler.convertToEntities(dto);
            const relationMap = await this.queryService.aggregateRelations(RelationClass, relationName, entities, filter, aggregate);
            return entities.reduce((map, e, index) => {
                var _a;
                const entry = (_a = relationMap.get(e)) !== null && _a !== void 0 ? _a : [];
                map.set(dto[index], entry);
                return map;
            }, new Map());
        }
        return this.queryService.aggregateRelations(RelationClass, relationName, this.assembler.convertToEntity(dto), filter, aggregate);
    }
    convertFilterable(filterable) {
        if (!filterable) {
            return filterable;
        }
        return { ...filterable, filter: this.assembler.convertQuery({ filter: filterable === null || filterable === void 0 ? void 0 : filterable.filter }).filter };
    }
    convertModifyRelationsOptions(modifyRelationOptions) {
        if (!modifyRelationOptions) {
            return undefined;
        }
        return {
            filter: this.assembler.convertQuery({ filter: modifyRelationOptions === null || modifyRelationOptions === void 0 ? void 0 : modifyRelationOptions.filter }).filter,
            relationFilter: modifyRelationOptions.relationFilter,
        };
    }
}
exports.AssemblerQueryService = AssemblerQueryService;
//# sourceMappingURL=assembler-query.service.js.map