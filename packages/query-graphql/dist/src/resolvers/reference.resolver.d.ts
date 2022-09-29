import { Class, QueryService } from '@nestjs-query/core';
import { ResolverClass, ServiceResolver } from './resolver.interface';
export interface ReferenceResolverOpts {
    key?: string;
}
/**
 * @internal
 * Mixin to expose `resolveReference` for a DTO on the resolver.
 */
export declare const Referenceable: <DTO, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts: ReferenceResolverOpts) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => B;
export declare const ReferenceResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: ReferenceResolverOpts) => ResolverClass<DTO, QS, ServiceResolver<DTO, QS>>;
