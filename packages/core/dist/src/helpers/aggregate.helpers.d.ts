import { AggregateQuery, AggregateResponse } from '../interfaces';
import { QueryFieldMap } from './query.helpers';
export declare const transformAggregateQuery: <From, To>(query: AggregateQuery<From>, fieldMap: QueryFieldMap<From, To, keyof To>) => AggregateQuery<To>;
export declare const transformAggregateResponse: <From, To>(response: AggregateResponse<From>, fieldMap: QueryFieldMap<From, To, keyof To>) => AggregateResponse<To>;
