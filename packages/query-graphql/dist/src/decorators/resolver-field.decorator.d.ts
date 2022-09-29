import { ResolveFieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ResolverMethodOpts } from './resolver-method.decorator';
/**
 * @internal
 * Decorator for resolving properties on.
 * @param name - the name of the property in graphql.
 * @param typeFunc - A function that returns the return type for the mutation.
 * @param options - `@nestjs/graphql` options to apply to the mutation.
 * @param opts -  [[ResolverMethodOpts]] to apply to the mutation
 */
export declare function ResolverField(name: string, typeFunc: ReturnTypeFunc, options?: ResolveFieldOptions, ...opts: ResolverMethodOpts[]): MethodDecorator;
