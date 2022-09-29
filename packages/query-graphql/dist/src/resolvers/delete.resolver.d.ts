import { Class, DeleteManyResponse, Filter, QueryService } from '@nestjs-query/core';
import { ResolverClass, ServiceResolver, SubscriptionResolverOpts } from './resolver.interface';
import { DeleteManyInputType, DeleteOneInputType, MutationArgsType, SubscriptionArgsType } from '../types';
export declare type DeletedEvent<DTO> = {
    [eventName: string]: DTO;
};
export interface DeleteResolverOpts<DTO> extends SubscriptionResolverOpts {
    /**
     * ArgsType for deleteOne mutation.
     */
    DeleteOneInput?: Class<DeleteOneInputType>;
    /**
     * ArgsType for deleteMany mutation.
     */
    DeleteManyInput?: Class<DeleteManyInputType<DTO>>;
}
export interface DeleteResolver<DTO, QS extends QueryService<DTO, unknown, unknown>> extends ServiceResolver<DTO, QS> {
    deleteOne(input: MutationArgsType<DeleteOneInputType>, authorizeFilter?: Filter<DTO>): Promise<Partial<DTO>>;
    deleteMany(input: MutationArgsType<DeleteManyInputType<DTO>>, authorizeFilter?: Filter<DTO>): Promise<DeleteManyResponse>;
    deletedOneSubscription(input?: SubscriptionArgsType<DTO>, authorizeFilter?: Filter<DTO>): AsyncIterator<DeletedEvent<Partial<DTO>>>;
    deletedManySubscription(authorizeFilter?: Filter<DTO>): AsyncIterator<DeletedEvent<DeleteManyResponse>>;
}
/**
 * @internal
 * Mixin to add `delete` graphql endpoints.
 */
export declare const Deletable: <DTO, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts: DeleteResolverOpts<DTO>) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<DeleteResolver<DTO, QS>> & B;
export declare const DeleteResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: DeleteResolverOpts<DTO>) => ResolverClass<DTO, QS, DeleteResolver<DTO, QS>>;
