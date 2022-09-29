import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { RelationsOpts } from './relations.interface';
export interface AggregateRelationsResolverOpts extends RelationsOpts {
    /**
     * Enable relation aggregation queries on relation
     */
    enableAggregate?: boolean;
}
export declare const AggregateRelationsMixin: <DTO>(DTOClass: Class<DTO>, relations: AggregateRelationsResolverOpts) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const AggregateRelationsResolver: <DTO>(DTOClass: Class<DTO>, relations: AggregateRelationsResolverOpts) => Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>;
