/**
 * This is the doc comment for file1.ts
 * @packageDocumentation
 */
import { Class, DeepPartial, Filter, QueryService } from '@nestjs-query/core';
import { CreateManyInputType, CreateOneInputType, MutationArgsType, SubscriptionArgsType } from '../types';
import { ResolverClass, ServiceResolver, SubscriptionResolverOpts } from './resolver.interface';
export declare type CreatedEvent<DTO> = {
    [eventName: string]: DTO;
};
export interface CreateResolverOpts<DTO, C = DeepPartial<DTO>> extends SubscriptionResolverOpts {
    /**
     * The Input DTO that should be used to create records.
     */
    CreateDTOClass?: Class<C>;
    /**
     * The class to be used for `createOne` input.
     */
    CreateOneInput?: Class<CreateOneInputType<C>>;
    /**
     * The class to be used for `createMany` input.
     */
    CreateManyInput?: Class<CreateManyInputType<C>>;
    createOneMutationName?: string;
    createManyMutationName?: string;
}
export interface CreateResolver<DTO, C, QS extends QueryService<DTO, C, unknown>> extends ServiceResolver<DTO, QS> {
    createOne(input: MutationArgsType<CreateOneInputType<C>>, authorizeFilter?: Filter<DTO>): Promise<DTO>;
    createMany(input: MutationArgsType<CreateManyInputType<C>>, authorizeFilter?: Filter<DTO>): Promise<DTO[]>;
    createdSubscription(input?: SubscriptionArgsType<DTO>, authorizeFilter?: Filter<DTO>): AsyncIterator<CreatedEvent<DTO>>;
}
/**
 * @internal
 * Mixin to add `create` graphql endpoints.
 */
export declare const Creatable: <DTO, C, QS extends QueryService<DTO, C, unknown>>(DTOClass: Class<DTO>, opts: CreateResolverOpts<DTO, C>) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<CreateResolver<DTO, C, QS>> & B;
/**
 * Factory to create a new abstract class that can be extended to add `create` endpoints.
 *
 * Assume we have `TodoItemDTO`, you can create a resolver with `createOneTodoItem` and `createManyTodoItems` graphql
 * query endpoints using the following code.
 *
 * ```ts
 * @Resolver()
 * export class TodoItemResolver extends CreateResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *    super(service);
 *   }
 * }
 * ```
 *
 * @param DTOClass - The DTO class that should be returned from the `createOne` and `createMany` endpoint.
 * @param opts - Options to customize endpoints.
 * @typeparam DTO - The type of DTO that should be created.
 * @typeparam C - The create DTO type.
 */
export declare const CreateResolver: <DTO, C = DeepPartial<DTO>, QS extends QueryService<DTO, C, unknown> = QueryService<DTO, C, unknown>>(DTOClass: Class<DTO>, opts?: CreateResolverOpts<DTO, C>) => ResolverClass<DTO, QS, CreateResolver<DTO, C, QS>>;
