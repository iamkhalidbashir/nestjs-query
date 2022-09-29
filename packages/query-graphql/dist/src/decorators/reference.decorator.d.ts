import { Class } from '@nestjs-query/core';
import { ReferencesOpts, ResolverRelationReference } from '../resolvers/relations';
import { ReferencesKeys } from '../resolvers/relations/relations.interface';
import { BaseResolverOptions } from './resolver-method.decorator';
export declare type ReferenceDecoratorOpts<DTO, Relation> = Omit<ResolverRelationReference<DTO, Relation>, 'DTO' | 'keys'>;
export declare type ReferenceTypeFunc<Relation> = () => Class<Relation>;
export declare function getReferences<DTO>(DTOClass: Class<DTO>, opts?: BaseResolverOptions): ReferencesOpts<DTO>;
export declare function Reference<DTO, Reference>(name: string, relationTypeFunc: ReferenceTypeFunc<Reference>, keys: ReferencesKeys<any, Reference>, relationOpts?: ReferenceDecoratorOpts<DTO, Reference>): <Cls extends Class<DTO>>(DTOClass: Cls) => void | Cls;
