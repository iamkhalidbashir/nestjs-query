import { AggregateQuery, Filter, Query, SortField } from '@nestjs-query/core';
import { DocumentType, ReturnModelType, mongoose } from '@typegoose/typegoose';
import { AggregateBuilder, TypegooseGroupAndAggregate } from './aggregate.builder';
import { WhereBuilder } from './where.builder';
declare type TypegooseSort = Record<string, 1 | -1>;
declare type TypegooseQuery<Entity> = {
    filterQuery: mongoose.FilterQuery<new () => Entity>;
    options: {
        limit?: number;
        skip?: number;
        sort?: TypegooseSort;
    };
};
declare type TypegooseAggregateQuery<Entity> = TypegooseQuery<Entity> & {
    aggregate: TypegooseGroupAndAggregate;
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
export declare class FilterQueryBuilder<Entity> {
    readonly Model: ReturnModelType<new () => Entity>;
    readonly whereBuilder: WhereBuilder<Entity>;
    readonly aggregateBuilder: AggregateBuilder<Entity>;
    constructor(Model: ReturnModelType<new () => Entity>, whereBuilder?: WhereBuilder<Entity>, aggregateBuilder?: AggregateBuilder<Entity>);
    buildQuery({ filter, paging, sorting }: Query<Entity>): TypegooseQuery<Entity>;
    buildAggregateQuery(aggregate: AggregateQuery<DocumentType<Entity>>, filter?: Filter<Entity>): TypegooseAggregateQuery<Entity>;
    buildIdAggregateQuery(id: unknown | unknown[], filter: Filter<Entity>, aggregate: AggregateQuery<Entity>): TypegooseAggregateQuery<Entity>;
    buildIdFilterQuery(id: unknown | unknown[], filter?: Filter<Entity>): mongoose.FilterQuery<new () => Entity>;
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter?: Filter<Entity>): mongoose.FilterQuery<new () => Entity>;
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts?: SortField<Entity>[]): TypegooseSort | undefined;
    private buildAggregateSorting;
}
export {};
