import { Class, QueryService } from '@nestjs-query/core';
import { ServiceResolver } from '../resolver.interface';
import { ReferencesOpts } from './relations.interface';
export declare const ReferencesRelationMixin: <DTO>(DTOClass: Class<DTO>, references: ReferencesOpts<DTO>) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
export declare const ReferencesRelationsResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, references: ReferencesOpts<DTO>) => Class<ServiceResolver<DTO, QS>>;
