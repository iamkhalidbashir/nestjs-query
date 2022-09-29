import { AggregateQuery, Filter, Paging, Query, SortField } from '@nestjs-query/core';
import { FindOptions, Filterable, DestroyOptions, Order, UpdateOptions, CountOptions, GroupOption } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import { AggregateBuilder } from './aggregate.builder';
import { WhereBuilder } from './where.builder';
/**
 * @internal
 *
 * Interface that for `sequelize` query builders that are sortable.
 */
interface Sortable {
    order?: Order;
}
/**
 * @internal
 *
 * Interface for `sequelize` query builders that are pageable.
 */
interface Pageable {
    limit?: number;
    offset?: number;
}
interface Groupable {
    group?: GroupOption;
}
/**
 * @internal
 *
 * Class that will convert a Query into a `sequelize` Query Builder.
 */
export declare class FilterQueryBuilder<Entity extends Model<Entity, Partial<Entity>>> {
    readonly model: ModelCtor<Entity>;
    readonly whereBuilder: WhereBuilder<Entity>;
    readonly aggregateBuilder: AggregateBuilder<Entity>;
    constructor(model: ModelCtor<Entity>, whereBuilder?: WhereBuilder<Entity>, aggregateBuilder?: AggregateBuilder<Entity>);
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param query - the query to apply.
     */
    findOptions(query: Query<Entity>): FindOptions;
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param pk - The primary key(s) of records to find.
     * @param query - the query to apply.
     */
    findByIdOptions(pk: string | number | (string | number)[], query: Query<Entity>): FindOptions;
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param query - the query to apply.
     * @param aggregate - the aggregate query
     */
    aggregateOptions(query: Query<Entity>, aggregate: AggregateQuery<Entity>): FindOptions;
    relationAggregateOptions(query: Query<Entity>, aggregate: AggregateQuery<Entity>): FindOptions;
    countOptions(query: Query<Entity>): CountOptions;
    /**
     * Create a `sequelize` DeleteQueryBuilder with a WHERE clause.
     *
     * @param query - the query to apply.
     */
    destroyOptions(query: Query<Entity>): DestroyOptions;
    /**
     * Create a `sequelize` UpdateQueryBuilder with `WHERE` and `ORDER BY` clauses
     *
     * @param query - the query to apply.
     */
    updateOptions(query: Query<Entity>): UpdateOptions<Entity['_attributes']>;
    /**
     * Applies paging to a Pageable `sequelize` query builder
     * @param qb - the `sequelize` QueryBuilder
     * @param paging - the Paging options.
     */
    applyPaging<P extends Pageable>(qb: P, paging?: Paging): P;
    /**
     * Applies the filter from a Query to a `sequelize` QueryBuilder.
     *
     * @param filterable - the `sequelize` QueryBuilder.
     * @param filter - the filter.
     */
    applyFilter<Where extends Filterable>(filterable: Where, filter?: Filter<Entity>): Where;
    /**
     * Applies the ORDER BY clause to a `sequelize` QueryBuilder.
     * @param qb - the `sequelize` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    applySorting<T extends Sortable>(qb: T, sorts?: SortField<Entity>[]): T;
    private applyAggregate;
    applyGroupBy<T extends Groupable>(qb: T, groupBy?: (keyof Entity)[]): T;
    applyAggregateSorting<T extends Sortable>(qb: T, groupBy?: (keyof Entity)[]): T;
    private applyAssociationIncludes;
    private getReferencedRelations;
    private get relationNames();
}
export {};
