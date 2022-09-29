import { CommonFieldComparisonBetweenType, FilterComparisonOperators } from '@nestjs-query/core';
import { Model as MongooseModel, FilterQuery, Document } from 'mongoose';
/**
 * @internal
 */
export declare type EntityComparisonField<Entity, F extends keyof Entity> = Entity[F] | Entity[F][] | CommonFieldComparisonBetweenType<Entity[F]> | true | false | null;
/**
 * @internal
 * Builder to create SQL Comparisons. (=, !=, \>, etc...)
 */
export declare class ComparisonBuilder<Entity extends Document> {
    readonly Model: MongooseModel<Entity>;
    readonly comparisonMap: Record<string, string>;
    static DEFAULT_COMPARISON_MAP: Record<string, string>;
    constructor(Model: MongooseModel<Entity>, comparisonMap?: Record<string, string>);
    /**
     * Creates a valid SQL fragment with parameters.
     *
     * @param field - the property in Entity to create the comparison for.
     * @param cmp - the FilterComparisonOperator (eq, neq, gt, etc...)
     * @param val - the value to compare to.
     */
    build<F extends keyof Entity>(field: F, cmp: FilterComparisonOperators<Entity[F]>, val: EntityComparisonField<Entity, F>): FilterQuery<Entity>;
    private betweenComparison;
    private isBetweenVal;
    private likeComparison;
    private convertQueryValue;
    private convertToObjectId;
}
