import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { BaseResolverOptions } from '../../decorators/resolver-method.decorator';
export declare const FederationResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: BaseResolverOptions) => Class<ServiceResolver<DTO, QS>>;
