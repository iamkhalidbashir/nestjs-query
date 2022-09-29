import { MutationOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ResolverMethodOpts } from './resolver-method.decorator';
/**
 * @internal
 * Decorator for a graphql `mutation` endpoint.
 * @param typeFunc - A function that returns the return type for the mutation.
 * @param options - `@nestjs/graphql` options to apply to the mutation.
 * @param opts -  [[ResolverMethodOpts]] to apply to the mutation
 */
export declare function ResolverMutation(typeFunc: ReturnTypeFunc, options?: MutationOptions, ...opts: ResolverMethodOpts[]): MethodDecorator;
