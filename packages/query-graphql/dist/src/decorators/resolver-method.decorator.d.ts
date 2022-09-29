import { CanActivate, ExceptionFilter, NestInterceptor, PipeTransform } from '@nestjs/common';
import { Class } from '@nestjs-query/core';
export interface BaseResolverOptions {
    /** An array of `nestjs` guards to apply to a graphql endpoint */
    guards?: (Class<CanActivate> | CanActivate)[];
    /** An array of `nestjs` interceptors to apply to a graphql endpoint */
    interceptors?: Class<NestInterceptor<any, any>>[];
    /** An array of `nestjs` pipes to apply to a graphql endpoint */
    pipes?: Class<PipeTransform<any, any>>[];
    /** An array of `nestjs` error filters to apply to a graphql endpoint */
    filters?: Class<ExceptionFilter<any>>[];
    /** An array of additional decorators to apply to the graphql endpont * */
    decorators?: (PropertyDecorator | MethodDecorator)[];
}
/**
 * Options for resolver methods.
 */
export interface ResolverMethodOpts extends BaseResolverOptions {
    /** Set to true to disable the endpoint */
    disabled?: boolean;
}
/**
 * @internal
 * Returns true if any of the [[ResolverMethodOpts]] are disabled.
 * @param opts - The array of [[ResolverMethodOpts]] to check.
 */
export declare function isDisabled(opts: ResolverMethodOpts[]): boolean;
/**
 * @internal
 * Decorator for all ResolverMethods
 *
 * @param opts - the [[ResolverMethodOpts]] to apply.
 */
export declare function ResolverMethod(...opts: ResolverMethodOpts[]): MethodDecorator;
