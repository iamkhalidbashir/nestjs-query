import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { RelationsOpts } from './relations.interface';
export interface ReadRelationsResolverOpts extends RelationsOpts {
    enableTotalCount?: boolean;
}
export declare const ReadRelationsMixin: <DTO>(DTOClass: Class<DTO>, relations: ReadRelationsResolverOpts) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const ReadRelationsResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, relations: ReadRelationsResolverOpts) => Class<ServiceResolver<DTO, QS>>;
