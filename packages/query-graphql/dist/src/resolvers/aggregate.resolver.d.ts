import { AggregateQuery, AggregateResponse, Class, Filter, QueryService } from '@nestjs-query/core';
import { ResolverMethodOpts } from '../decorators';
import { AggregateArgsType } from '../types';
import { ResolverClass, ServiceResolver } from './resolver.interface';
export declare type AggregateResolverOpts = {
    enabled?: boolean;
} & ResolverMethodOpts;
export interface AggregateResolver<DTO, QS extends QueryService<DTO, unknown, unknown>> extends ServiceResolver<DTO, QS> {
    aggregate(filter: AggregateArgsType<DTO>, aggregateQuery: AggregateQuery<DTO>, authFilter?: Filter<DTO>): Promise<AggregateResponse<DTO>[]>;
}
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
export declare const Aggregateable: <DTO, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: AggregateResolverOpts | undefined) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<AggregateResolver<DTO, QS>> & B;
export declare const AggregateResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: AggregateResolverOpts | undefined) => ResolverClass<DTO, QS, AggregateResolver<DTO, QS>>;
