import { Class, DeepPartial } from '../common';
import { AggregateQuery, AggregateResponse, DeleteManyResponse, DeleteOneOptions, Filter, FindByIdOptions, FindRelationOptions, GetByIdOptions, ModifyRelationOptions, Query, UpdateManyResponse, UpdateOneOptions } from '../interfaces';
import { QueryService } from './query.service';
export declare class ProxyQueryService<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>> implements QueryService<DTO, C, U> {
    readonly proxied: QueryService<DTO, C, U>;
    constructor(proxied: QueryService<DTO, C, U>);
    addRelations<Relation>(relationName: string, id: string | number, relationIds: (string | number)[], opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    removeRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    removeRelations<Relation>(relationName: string, id: string | number, relationIds: (string | number)[], opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    setRelations<Relation>(relationName: string, id: string | number, relationIds: (string | number)[], opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    setRelation<Relation>(relationName: string, id: string | number, relationId: string | number, opts?: ModifyRelationOptions<DTO, Relation>): Promise<DTO>;
    /**
     * Query for relations for an array of DTOs. This method will return a map with the DTO as the key and the relations as the value.
     * @param RelationClass - The class of the relation.
     * @param relationName - The name of the relation to load.
     * @param dtos - the dtos to find relations for.
     * @param query - A query to use to filter, page, and sort relations.
     */
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], query: Query<Relation>): Promise<Map<DTO, Relation[]>>;
    /**
     * Query for an array of relations.
     * @param RelationClass - The class to serialize the relations into.
     * @param dto - The dto to query relations for.
     * @param relationName - The name of relation to query for.
     * @param query - A query to filter, page and sort relations.
     */
    queryRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, query: Query<Relation>): Promise<Relation[]>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], filter: Filter<Relation>): Promise<Map<DTO, number>>;
    countRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, filter: Filter<Relation>): Promise<number>;
    /**
     * Find a relation for an array of DTOs. This will return a Map where the key is the DTO and the value is to relation or undefined if not found.
     * @param RelationClass - the class of the relation
     * @param relationName - the name of the relation to load.
     * @param dtos - the dtos to find the relation for.
     * @param filter - Additional filter to apply when finding relations
     */
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], opts?: FindRelationOptions<Relation>): Promise<Map<DTO, Relation | undefined>>;
    /**
     * Finds a single relation.
     * @param RelationClass - The class to serialize the relation into.
     * @param dto - The dto to find the relation for.
     * @param relationName - The name of the relation to query for.
     * @param filter - Additional filter to apply when finding relations
     */
    findRelation<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, opts?: FindRelationOptions<Relation>): Promise<Relation | undefined>;
    createMany(items: C[]): Promise<DTO[]>;
    createOne(item: C): Promise<DTO>;
    deleteMany(filter: Filter<DTO>): Promise<DeleteManyResponse>;
    deleteOne(id: number | string, opts?: DeleteOneOptions<DTO>): Promise<DTO>;
    findById(id: string | number, opts?: FindByIdOptions<DTO>): Promise<DTO | undefined>;
    getById(id: string | number, opts?: GetByIdOptions<DTO>): Promise<DTO>;
    query(query: Query<DTO>): Promise<DTO[]>;
    aggregate(filter: Filter<DTO>, query: AggregateQuery<DTO>): Promise<AggregateResponse<DTO>[]>;
    count(filter: Filter<DTO>): Promise<number>;
    updateMany(update: U, filter: Filter<DTO>): Promise<UpdateManyResponse>;
    updateOne(id: string | number, update: U, opts?: UpdateOneOptions<DTO>): Promise<DTO>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<AggregateResponse<Relation>[]>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<Map<DTO, AggregateResponse<Relation>[]>>;
}
