import { Class, DeepPartial } from '../common';
import { Filter, Query, AggregateQuery, AggregateResponse, FindRelationOptions } from '../interfaces';
import { ProxyQueryService } from './proxy-query.service';
import { QueryService } from './query.service';
export declare type QueryServiceRelation<DTO, Relation> = {
    service: QueryService<Relation, unknown, unknown>;
    query: (dto: DTO) => Query<Relation>;
};
export declare class RelationQueryService<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>> extends ProxyQueryService<DTO, C, U> {
    readonly relations: Record<string, QueryServiceRelation<DTO, unknown>>;
    constructor(queryService: QueryService<DTO, C, U>, relations: Record<string, QueryServiceRelation<DTO, unknown>>);
    constructor(relations: Record<string, QueryServiceRelation<DTO, unknown>>);
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
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dto: DTO, filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<AggregateResponse<Relation>[]>;
    aggregateRelations<Relation>(RelationClass: Class<Relation>, relationName: string, dtos: DTO[], filter: Filter<Relation>, aggregate: AggregateQuery<Relation>): Promise<Map<DTO, AggregateResponse<Relation>[]>>;
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
    getRelation<Relation>(name: string): QueryServiceRelation<DTO, Relation> | undefined;
}
