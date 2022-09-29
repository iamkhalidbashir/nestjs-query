import { Class, Filter } from '@nestjs-query/core';
export declare type FilterTypeOptions = {
    allowedBooleanExpressions?: ('and' | 'or')[];
};
export declare type FilterableRelations = Record<string, Class<unknown>>;
export interface FilterConstructor<T> {
    hasRequiredFilters: boolean;
    new (): Filter<T>;
}
export declare function FilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function DeleteFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function UpdateFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function SubscriptionFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function AggregateFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
