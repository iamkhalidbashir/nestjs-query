import { WhereOptions, Association } from 'sequelize';
import { Filter } from '@nestjs-query/core';
import { SQLComparisonBuilder } from './sql-comparison.builder';
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class WhereBuilder<Entity> {
    readonly sqlComparisonBuilder: SQLComparisonBuilder<Entity>;
    constructor(sqlComparisonBuilder?: SQLComparisonBuilder<Entity>);
    /**
     * Builds a WHERE clause from a Filter.
     * @param filter - the filter to build the WHERE clause from.
     * @param associations - map of associations that are included in the query.
     */
    build(filter: Filter<Entity>, associations: Map<string, Association>, alias?: string): WhereOptions;
    /**
     * Creates field comparisons from a filter. This method will ignore and/or properties.
     * @param filter - the filter with fields to create comparisons for.
     */
    private filterFields;
    private getField;
    private withFilterComparison;
}
