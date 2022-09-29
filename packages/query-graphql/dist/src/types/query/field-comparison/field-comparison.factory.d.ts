import { Class, FilterFieldComparison, FilterComparisonOperators } from '@nestjs-query/core';
import { ReturnTypeFunc } from '@nestjs/graphql';
declare type FilterComparisonOptions<T> = {
    FieldType: Class<T>;
    fieldName: string;
    allowedComparisons?: FilterComparisonOperators<T>[];
    returnTypeFunc?: ReturnTypeFunc;
};
/** @internal */
export declare function createFilterComparisonType<T>(options: FilterComparisonOptions<T>): Class<FilterFieldComparison<T>>;
export {};
