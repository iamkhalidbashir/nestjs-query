import { Paging, Query, SortField } from '../interfaces';
export declare type QueryFieldMap<From, To, T extends keyof To = keyof To> = {
    [F in keyof From]?: T;
};
export declare const transformSort: <From, To>(sorting: SortField<From>[] | undefined, fieldMap: QueryFieldMap<From, To, keyof To>) => SortField<To>[] | undefined;
export declare const transformQuery: <From, To>(query: Query<From>, fieldMap: QueryFieldMap<From, To, keyof To>) => Query<To>;
export declare const mergeQuery: <T>(base: Query<T>, source: Query<T>) => Query<T>;
export declare const applySort: <DTO>(dtos: DTO[], sortFields: SortField<DTO>[]) => DTO[];
export declare const applyPaging: <DTO>(dtos: DTO[], paging: Paging) => DTO[];
export declare const applyQuery: <DTO>(dtos: DTO[], query: Query<DTO>) => DTO[];
export declare function invertSort<DTO>(sortFields: SortField<DTO>[]): SortField<DTO>[];
