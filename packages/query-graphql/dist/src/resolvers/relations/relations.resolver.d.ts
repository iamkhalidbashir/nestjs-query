import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { BaseResolverOptions } from '../../decorators/resolver-method.decorator';
export interface RelatableOpts extends BaseResolverOptions {
    enableTotalCount?: boolean;
    enableAggregate?: boolean;
}
export declare const Relatable: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts: RelatableOpts) => <B extends Class<ServiceResolver<DTO, QS>>>(Base: B) => B;
