import { Query, Class, Filter, AggregateQuery, AggregateResponse, ModifyRelationOptions, GetByIdOptions, FindRelationOptions } from '@nestjs-query/core';
import { Model, ModelCtor } from 'sequelize-typescript';
import { FilterQueryBuilder } from '../query';
/**
 * Base class to house relations loading.
 * @internal
 */
export declare abstract class RelationQueryService<Entity extends Model<Entity, Partial<Entity>>> {
    abstract filterQueryBuilder: FilterQueryBuilder<Entity>;
    abstract model: ModelCtor<Entity>;
    abstract getById(id: string | number, opts?: GetByIdOptions<Entity>): Promise<Entity>;
    /**
     * Query for relations for an array of Entities. This method will return a map with the Entity as the key and the relations as the value.
     * @param RelationClass - The class of the relation.
     * @param relationName - The name of the relation to load.
     * @param entities - the dtos to find relations for.
     * @param query - A query to use to filter, page, and sort relations.
     */
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, entities: Entity[], query: Query<Relation>): Promise<Map<Entity, Relation[]>>;
    /**
     * Query for an array of relations.
     * @param RelationClass - The class to serialize the relations into.
     * @param dto - The dto to query relations for.
     * @param relationName - The name of relation to query for.
     * @param query - A query to filter, page and sort relations.
     */
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: Entity, query: Query<Relation>): Promise<Relation[]>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, entities: Entity[], filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<Map<Entity, AggregateResponse<Relation>[]>>;
    /**
     * Query for an array of relations.
     * @param RelationClass - The class to serialize the relations into.
     * @param dto - The dto to query relations for.
     * @param relationName - The name of relation to query for.
     * @param filter - Filter for relations to aggregate on.
     * @param aggregate - Aggregate query
     */
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: Entity, filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<AggregateResponse<Relation>[]>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, entities: Entity[], filter: Filter<Relation>): Promise<Map<Entity, number>>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: Entity, filter: Filter<Relation>): Promise<number>;
    /**
     * Find a relation for an array of Entities. This will return a Map where the key is the Entity and the value is to
     * relation or undefined if not found.
     * @param RelationClass - the class of the relation
     * @param relationName - the name of the relation to load.
     * @param dtos - the dtos to find the relation for.
     * @param opts - Additional options
     */
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: Entity[], opts?: FindRelationOptions<Relation>): Promise<Map<Entity, Relation | undefined>>;
    /**
     * Finds a single relation.
     * @param RelationClass - The class to serialize the relation into.
     * @param dto - The dto to find the relation for.
     * @param relationName - The name of the relation to query for.
     * @param opts - Additional options
     */
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dto: Entity, opts?: FindRelationOptions<Relation>): Promise<Relation | undefined>;
    /**
     * Add a single relation.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of relations to add.
     * @param opts - Additional options
     */
    addRelations<Relation>(relationName: string, id: string | number, relationIds: string[] | number[], opts?: ModifyRelationOptions<Entity, Relation>): Promise<Entity>;
    /**
     * Set the relations on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relation to set on the entity. If the relationIds is empty all relations
     * will be removed.
     * @param opts - Additional options
     */
    setRelations<Relation>(relationName: string, id: string | number, relationIds: string[] | number[], opts?: ModifyRelationOptions<Entity, Relation>): Promise<Entity>;
    /**
     * Set the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     * @param opts - Additional options
     */
    setRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<Entity, Relation>): Promise<Entity>;
    /**
     * Removes multiple relations.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relations to add.
     * @param opts - Additional options
     */
    removeRelations<Relation>(relationName: string, id: string | number, relationIds: string[] | number[], opts?: ModifyRelationOptions<Entity, Relation>): Promise<Entity>;
    /**
     * Remove the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     * @param opts - Additional options
     */
    removeRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<Entity, Relation>): Promise<Entity>;
    getRelationQueryBuilder<Relation extends Model>(model: ModelCtor<Relation>): FilterQueryBuilder<Relation>;
    /**
     * Query for an array of relations for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param entities - The entities to query relations for.
     * @param relationName - The name of relation to query for.
     * @param query - A query to filter, page or sort relations.
     */
    private batchQueryRelations;
    private batchAggregateRelations;
    private batchCountRelations;
    private batchFindRelations;
    private ensureIsEntity;
    private getAssociation;
    private getRelationEntity;
    private getRelations;
    private foundAllRelations;
}
