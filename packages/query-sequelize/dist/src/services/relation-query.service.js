"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationQueryService = void 0;
const core_1 = require("@nestjs-query/core");
const query_1 = require("../query");
/**
 * Base class to house relations loading.
 * @internal
 */
class RelationQueryService {
    async queryRelations(RelationClass, relationName, dto, query) {
        if (Array.isArray(dto)) {
            return this.batchQueryRelations(RelationClass, relationName, dto, query);
        }
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const relations = await this.ensureIsEntity(dto).$get(relationName, relationQueryBuilder.findOptions(assembler.convertQuery(query)));
        return assembler.convertToDTOs(relations);
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        if (Array.isArray(dto)) {
            return this.batchAggregateRelations(RelationClass, relationName, dto, filter, aggregate);
        }
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const results = (await this.ensureIsEntity(dto).$get(relationName, relationQueryBuilder.relationAggregateOptions(assembler.convertQuery({ filter }), assembler.convertAggregateQuery(aggregate))));
        return query_1.AggregateBuilder.convertToAggregateResponse(results).map((a) => assembler.convertAggregateResponse(a));
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        if (Array.isArray(dto)) {
            return this.batchCountRelations(RelationClass, relationName, dto, filter);
        }
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        return this.ensureIsEntity(dto).$count(relationName, relationQueryBuilder.countOptions(assembler.convertQuery({ filter })));
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        if (Array.isArray(dto)) {
            return this.batchFindRelations(RelationClass, relationName, dto, opts);
        }
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const relation = await this.ensureIsEntity(dto).$get(relationName, relationQueryBuilder.findOptions(opts !== null && opts !== void 0 ? opts : {}));
        if (!relation) {
            return undefined;
        }
        return assembler.convertToDTO(relation);
    }
    /**
     * Add a single relation.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of relations to add.
     * @param opts - Additional options
     */
    async addRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        const relations = await this.getRelations(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (!this.foundAllRelations(relationIds, relations)) {
            throw new Error(`Unable to find all ${relationName} to add to ${this.model.name}`);
        }
        await entity.$add(relationName, relationIds);
        return entity;
    }
    /**
     * Set the relations on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relation to set on the entity. If the relationIds is empty all relations
     * will be removed.
     * @param opts - Additional options
     */
    async setRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        if (relationIds.length) {
            const relations = await this.getRelations(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
            if (relations.length !== relationIds.length) {
                throw new Error(`Unable to find all ${relationName} to set on ${this.model.name}`);
            }
        }
        await entity.$set(relationName, relationIds);
        return entity;
    }
    /**
     * Set the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     * @param opts - Additional options
     */
    async setRelation(relationName, id, relationId, opts) {
        const entity = await this.getById(id, opts);
        const relation = (await this.getRelations(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter))[0];
        if (!relation) {
            throw new Error(`Unable to find ${relationName} to set on ${this.model.name}`);
        }
        await entity.$set(relationName, relationId);
        return entity;
    }
    /**
     * Removes multiple relations.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relations to add.
     * @param opts - Additional options
     */
    async removeRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        const relations = await this.getRelations(relationName, relationIds, opts === null || opts === void 0 ? void 0 : opts.relationFilter);
        if (!this.foundAllRelations(relationIds, relations)) {
            throw new Error(`Unable to find all ${relationName} to remove from ${this.model.name}`);
        }
        await entity.$remove(relationName, relationIds);
        return entity;
    }
    /**
     * Remove the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     * @param opts - Additional options
     */
    async removeRelation(relationName, id, relationId, opts) {
        const entity = await this.getById(id, opts);
        const association = this.getAssociation(relationName);
        const relation = (await this.getRelations(relationName, [relationId], opts === null || opts === void 0 ? void 0 : opts.relationFilter))[0];
        if (!relation) {
            throw new Error(`Unable to find ${relationName} to remove from ${this.model.name}`);
        }
        if (association.isSingleAssociation) {
            // todo update that this line to remove the casting once https://github.com/RobinBuschmann/sequelize-typescript/issues/803 is addressed.
            await entity.$set(relationName, null);
        }
        else {
            await entity.$remove(relationName, relationId);
        }
        return entity;
    }
    getRelationQueryBuilder(model) {
        return new query_1.FilterQueryBuilder(model);
    }
    /**
     * Query for an array of relations for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param entities - The entities to query relations for.
     * @param relationName - The name of relation to query for.
     * @param query - A query to filter, page or sort relations.
     */
    async batchQueryRelations(RelationClass, relationName, entities, query) {
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const findOptions = relationQueryBuilder.findOptions(assembler.convertQuery(query));
        return entities.reduce(async (mapPromise, e) => {
            const map = await mapPromise;
            const relations = await this.ensureIsEntity(e).$get(relationName, findOptions);
            map.set(e, assembler.convertToDTOs(relations));
            return map;
        }, Promise.resolve(new Map()));
    }
    async batchAggregateRelations(RelationClass, relationName, entities, filter, aggregate) {
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const findOptions = relationQueryBuilder.relationAggregateOptions(assembler.convertQuery({ filter }), assembler.convertAggregateQuery(aggregate));
        return entities.reduce(async (mapPromise, e) => {
            const map = await mapPromise;
            const results = (await this.ensureIsEntity(e).$get(relationName, findOptions));
            const aggResponse = query_1.AggregateBuilder.convertToAggregateResponse(results).map((agg) => assembler.convertAggregateResponse(agg));
            map.set(e, aggResponse);
            return map;
        }, Promise.resolve(new Map()));
    }
    async batchCountRelations(RelationClass, relationName, entities, filter) {
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const findOptions = relationQueryBuilder.countOptions(assembler.convertQuery({ filter }));
        return entities.reduce(async (mapPromise, e) => {
            const map = await mapPromise;
            const count = await this.ensureIsEntity(e).$count(relationName, findOptions);
            map.set(e, count);
            return map;
        }, Promise.resolve(new Map()));
    }
    async batchFindRelations(RelationClass, relationName, dtos, opts) {
        const relationEntity = this.getRelationEntity(relationName);
        const assembler = core_1.AssemblerFactory.getAssembler(RelationClass, relationEntity);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        return dtos.reduce(async (mapPromise, e) => {
            const map = await mapPromise;
            const relation = await this.ensureIsEntity(e).$get(relationName, relationQueryBuilder.findOptions(opts !== null && opts !== void 0 ? opts : {}));
            if (relation) {
                map.set(e, assembler.convertToDTO(relation));
            }
            return map;
        }, Promise.resolve(new Map()));
    }
    ensureIsEntity(e) {
        if (!(e instanceof this.model)) {
            return this.model.build(e);
        }
        return e;
    }
    getAssociation(relationName) {
        const association = this.model.associations[relationName];
        if (!association) {
            throw new Error(`Unable to find relation ${relationName} on ${this.model.name}`);
        }
        return association;
    }
    getRelationEntity(relationName) {
        return this.getAssociation(relationName).target;
    }
    getRelations(relationName, ids, filter) {
        const relationEntity = this.getRelationEntity(relationName);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationEntity);
        const findOptions = relationQueryBuilder.findByIdOptions(ids, { filter });
        return relationEntity.findAll({ ...findOptions, attributes: [...relationEntity.primaryKeyAttributes] });
    }
    foundAllRelations(relationIds, relations) {
        return new Set([...relationIds]).size === relations.length;
    }
}
exports.RelationQueryService = RelationQueryService;
//# sourceMappingURL=relation-query.service.js.map