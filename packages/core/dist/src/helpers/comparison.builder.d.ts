import { FilterComparisonOperators } from '../interfaces';
import { ComparisonField, FilterFn } from './types';
export declare class ComparisonBuilder {
    static build<DTO, F extends keyof DTO>(field: F, cmp: FilterComparisonOperators<DTO[F]>, val: ComparisonField<DTO, F>): FilterFn<DTO>;
    private static booleanComparison;
    private static rangeComparison;
    private static likeComparison;
    private static inComparison;
    private static betweenComparison;
    private static likeSearchToRegexp;
}
