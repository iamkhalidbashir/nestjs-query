import { Filter } from '@nestjs-query/core';
import { FilterQuery, Document, Model as MongooseModel } from 'mongoose';
import { ComparisonBuilder } from './comparison.builder';
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class WhereBuilder<Entity extends Document> {
    readonly Model: MongooseModel<Entity>;
    readonly comparisonBuilder: ComparisonBuilder<Entity>;
    constructor(Model: MongooseModel<Entity>, comparisonBuilder?: ComparisonBuilder<Entity>);
    /**
     * Builds a WHERE clause from a Filter.
     * @param filter - the filter to build the WHERE clause from.
     */
    build(filter: Filter<Entity>): FilterQuery<Entity>;
    /**
     * Creates field comparisons from a filter. This method will ignore and/or properties.
     * @param filter - the filter with fields to create comparisons for.
     */
    private filterFields;
    private getField;
    private withFilterComparison;
}
