import { Class, SortField } from '@nestjs-query/core';
export declare function getOrCreateSortType<T>(TClass: Class<T>): Class<SortField<T>>;
