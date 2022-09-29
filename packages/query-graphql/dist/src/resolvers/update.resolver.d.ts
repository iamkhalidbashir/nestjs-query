import { Class, DeepPartial, DeleteManyResponse, Filter, QueryService, UpdateManyResponse } from '@nestjs-query/core';
import { MutationArgsType, SubscriptionArgsType, UpdateManyInputType, UpdateOneInputType } from '../types';
import { ResolverClass, ServiceResolver, SubscriptionResolverOpts } from './resolver.interface';
export declare type UpdatedEvent<DTO> = {
    [eventName: string]: DTO;
};
export interface UpdateResolverOpts<DTO, U = DeepPartial<DTO>> extends SubscriptionResolverOpts {
    UpdateDTOClass?: Class<U>;
    UpdateOneInput?: Class<UpdateOneInputType<U>>;
    UpdateManyInput?: Class<UpdateManyInputType<DTO, U>>;
}
export interface UpdateResolver<DTO, U, QS extends QueryService<DTO, unknown, U>> extends ServiceResolver<DTO, QS> {
    updateOne(input: MutationArgsType<UpdateOneInputType<U>>, authFilter?: Filter<DTO>): Promise<DTO>;
    updateMany(input: MutationArgsType<UpdateManyInputType<DTO, U>>, authFilter?: Filter<DTO>): Promise<UpdateManyResponse>;
    updatedOneSubscription(input?: SubscriptionArgsType<DTO>, authFilter?: Filter<DTO>): AsyncIterator<UpdatedEvent<DTO>>;
    updatedManySubscription(authFilter?: Filter<DTO>): AsyncIterator<UpdatedEvent<DeleteManyResponse>>;
}
/**
 * @internal
 * Mixin to add `update` graphql endpoints.
 */
export declare const Updateable: <DTO, U, QS extends QueryService<DTO, unknown, U>>(DTOClass: Class<DTO>, opts: UpdateResolverOpts<DTO, U>) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<UpdateResolver<DTO, U, QS>> & B;
export declare const UpdateResolver: <DTO, U = DeepPartial<DTO>, QS extends QueryService<DTO, unknown, U> = QueryService<DTO, unknown, U>>(DTOClass: Class<DTO>, opts?: UpdateResolverOpts<DTO, U>) => ResolverClass<DTO, QS, UpdateResolver<DTO, U, QS>>;
