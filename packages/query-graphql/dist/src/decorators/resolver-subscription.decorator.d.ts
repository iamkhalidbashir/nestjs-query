import { SubscriptionOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ResolverMethodOpts } from './resolver-method.decorator';
export interface SubscriptionResolverMethodOpts extends ResolverMethodOpts {
    enableSubscriptions?: boolean;
}
export declare function areSubscriptionsEnabled(opts: SubscriptionResolverMethodOpts[]): boolean;
export declare function ResolverSubscription(typeFunc: ReturnTypeFunc, options?: SubscriptionOptions, ...opts: SubscriptionResolverMethodOpts[]): MethodDecorator;
