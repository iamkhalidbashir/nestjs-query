import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { RelationsOpts } from './relations.interface';
export declare const UpdateRelationsMixin: <DTO>(DTOClass: Class<DTO>, relations: RelationsOpts) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const UpdateRelationsResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, relations: RelationsOpts) => Class<ServiceResolver<DTO, QS>>;
