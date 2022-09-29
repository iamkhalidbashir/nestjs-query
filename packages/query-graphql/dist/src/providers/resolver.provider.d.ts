import { Class } from '@nestjs-query/core';
import { Provider } from '@nestjs/common';
import { CRUDResolverOpts } from '../resolvers';
import { PagingStrategies } from '../types/query/paging';
export declare type CRUDAutoResolverOpts<DTO, C, U, R, PS extends PagingStrategies> = CRUDResolverOpts<DTO, C, U, R, PS> & {
    DTOClass: Class<DTO>;
};
export declare type EntityCRUDAutoResolverOpts<DTO, Entity, C, U, R, PS extends PagingStrategies> = CRUDAutoResolverOpts<DTO, C, U, R, PS> & {
    EntityClass: Class<Entity>;
};
export declare type AssemblerCRUDAutoResolverOpts<DTO, Assembler, C, U, R, PS extends PagingStrategies> = CRUDAutoResolverOpts<DTO, C, U, R, PS> & {
    AssemblerClass: Class<Assembler>;
};
export declare type ServiceCRUDAutoResolverOpts<DTO, QueryService, C, U, R, PS extends PagingStrategies> = CRUDAutoResolverOpts<DTO, C, U, R, PS> & {
    ServiceClass: Class<QueryService>;
};
export declare type FederatedAutoResolverOpts<DTO, Service> = {
    type: 'federated';
    DTOClass: Class<DTO>;
    Service: Class<Service>;
};
export declare type AutoResolverOpts<DTO, EntityServiceOrAssembler, C, U, R, PS extends PagingStrategies> = EntityCRUDAutoResolverOpts<DTO, EntityServiceOrAssembler, C, U, R, PS> | AssemblerCRUDAutoResolverOpts<DTO, EntityServiceOrAssembler, C, U, R, PS> | ServiceCRUDAutoResolverOpts<DTO, EntityServiceOrAssembler, C, U, R, PS> | FederatedAutoResolverOpts<DTO, EntityServiceOrAssembler>;
export declare const isFederatedResolverOpts: <DTO, MaybeService, C, U, R, PS extends PagingStrategies>(opts: AutoResolverOpts<DTO, MaybeService, C, U, R, PS>) => opts is FederatedAutoResolverOpts<DTO, MaybeService>;
export declare const isAssemblerCRUDAutoResolverOpts: <DTO, MaybeAssembler, C, U, R, PS extends PagingStrategies>(opts: AutoResolverOpts<DTO, MaybeAssembler, C, U, R, PS>) => opts is AssemblerCRUDAutoResolverOpts<DTO, MaybeAssembler, C, U, R, PS>;
export declare const isServiceCRUDAutoResolverOpts: <DTO, MaybeService, C, U, R, PS extends PagingStrategies>(opts: AutoResolverOpts<DTO, MaybeService, C, U, R, PS>) => opts is ServiceCRUDAutoResolverOpts<DTO, MaybeService, C, U, R, PS>;
export declare const createResolvers: (opts: AutoResolverOpts<unknown, unknown, unknown, unknown, unknown, PagingStrategies>[]) => Provider[];
