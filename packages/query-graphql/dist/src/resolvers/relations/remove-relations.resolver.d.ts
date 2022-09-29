import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { RelationsOpts } from './relations.interface';
export declare const RemoveRelationsMixin: <DTO>(DTOClass: Class<DTO>, relations: RelationsOpts) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const RemoveRelationsResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, relations: RelationsOpts) => Class<ServiceResolver<DTO, QS>>;
