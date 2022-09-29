import { Assembler, Class } from '@nestjs-query/core';
import { DynamicModule, ForwardReference, Provider } from '@nestjs/common';
import { AutoResolverOpts } from './providers';
import { ReadResolverOpts } from './resolvers';
import { GraphQLPubSub } from './subscription';
import { PagingStrategies } from './types/query/paging';
interface DTOModuleOpts<DTO> {
    DTOClass: Class<DTO>;
    CreateDTOClass?: Class<DTO>;
    UpdateDTOClass?: Class<DTO>;
}
export interface NestjsQueryGraphqlModuleOpts {
    imports: Array<Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    services?: Provider[];
    assemblers?: Class<Assembler<any, any, any, any, any, any>>[];
    resolvers?: AutoResolverOpts<any, any, unknown, unknown, ReadResolverOpts<any>, PagingStrategies>[];
    dtos?: DTOModuleOpts<unknown>[];
    pubSub?: Provider<GraphQLPubSub>;
}
export declare class NestjsQueryGraphQLModule {
    static forFeature(opts: NestjsQueryGraphqlModuleOpts): DynamicModule;
    static defaultPubSubProvider(): Provider<GraphQLPubSub>;
    private static getCoreModule;
    private static getProviders;
    private static getPubSubProviders;
    private static getServicesProviders;
    private static getResolverProviders;
    private static getAuthorizerProviders;
    private static getHookProviders;
}
export {};
