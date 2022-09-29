import { Class, Filter, QueryService } from '@nestjs-query/core';
import { FindOneArgsType, PagingStrategies, QueryArgsTypeOpts, ConnectionOptions, InferConnectionTypeFromStrategy } from '../types';
import { CursorQueryArgsTypeOpts, QueryType, StaticQueryType } from '../types/query/query-args';
import { ExtractPagingStrategy, ResolverClass, ResolverOpts, ServiceResolver } from './resolver.interface';
export declare type ReadResolverFromOpts<DTO, Opts extends ReadResolverOpts<DTO>, QS extends QueryService<DTO, unknown, unknown>> = ReadResolver<DTO, ExtractPagingStrategy<DTO, Opts>, QS>;
export declare type ReadResolverOpts<DTO> = {
    QueryArgs?: StaticQueryType<DTO, PagingStrategies>;
} & ResolverOpts & QueryArgsTypeOpts<DTO> & Pick<ConnectionOptions, 'enableTotalCount'>;
export interface ReadResolver<DTO, PS extends PagingStrategies, QS extends QueryService<DTO, unknown, unknown>> extends ServiceResolver<DTO, QS> {
    queryMany(query: QueryType<DTO, PagingStrategies>, authorizeFilter?: Filter<DTO>): Promise<InferConnectionTypeFromStrategy<DTO, PS>>;
    findById(id: FindOneArgsType, authorizeFilter?: Filter<DTO>): Promise<DTO | undefined>;
}
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
export declare const Readable: <DTO, ReadOpts extends ReadResolverOpts<DTO>, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts: ReadOpts) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<ReadResolverFromOpts<DTO, ReadOpts, QS>> & B;
export declare const ReadResolver: <DTO, ReadOpts extends ReadResolverOpts<DTO> = CursorQueryArgsTypeOpts<DTO>, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: ReadOpts) => ResolverClass<DTO, QS, ReadResolverFromOpts<DTO, ReadOpts, QS>>;
