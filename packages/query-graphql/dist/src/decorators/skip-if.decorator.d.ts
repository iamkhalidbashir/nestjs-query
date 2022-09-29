import { ComposableDecorator, ComposedDecorator } from './decorator.utils';
/**
 * @internal
 * Wraps Args to allow skipping decorating
 * @param check - checker to run.
 * @param decorators - The decorators to apply
 */
export declare function SkipIf(check: () => boolean, ...decorators: ComposableDecorator[]): ComposedDecorator;
