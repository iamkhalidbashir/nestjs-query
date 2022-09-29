import { AggregateQuery, Filter, Query, SortField } from '@nestjs-query/core';
import { FilterQuery, Document, Model as MongooseModel } from 'mongoose';
import { AggregateBuilder, MongooseGroupAndAggregate } from './aggregate.builder';
import { WhereBuilder } from './where.builder';
declare type MongooseSort = Record<string, 1 | -1>;
declare type MongooseQuery<Entity extends Document> = {
    filterQuery: FilterQuery<Entity>;
    options: {
        limit?: number;
        skip?: number;
        sort?: MongooseSort;
    };
};
declare type MongooseAggregateQuery<Entity extends Document> = MongooseQuery<Entity> & {
    aggregate: MongooseGroupAndAggregate;
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
export declare class FilterQueryBuilder<Entity extends Document> {
    readonly Model: MongooseModel<Entity>;
    readonly whereBuilder: WhereBuilder<Entity>;
    readonly aggregateBuilder: AggregateBuilder<Entity>;
    constructor(Model: MongooseModel<Entity>, whereBuilder?: WhereBuilder<Entity>, aggregateBuilder?: AggregateBuilder<Entity>);
    buildQuery({ filter, paging, sorting }: Query<Entity>): MongooseQuery<Entity>;
    buildAggregateQuery(aggregate: AggregateQuery<Entity>, filter?: Filter<Entity>): MongooseAggregateQuery<Entity>;
    buildIdAggregateQuery(id: unknown | unknown[], filter: Filter<Entity>, aggregate: AggregateQuery<Entity>): MongooseAggregateQuery<Entity>;
    buildIdFilterQuery(id: unknown | unknown[], filter?: Filter<Entity>): FilterQuery<Entity>;
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter?: Filter<Entity>): FilterQuery<Entity>;
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts?: SortField<Entity>[]): MongooseSort | undefined;
    private buildAggregateSorting;
}
export {};
