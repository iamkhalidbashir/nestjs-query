"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverSubscription = exports.areSubscriptionsEnabled = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const resolver_method_decorator_1 = require("./resolver-method.decorator");
function areSubscriptionsEnabled(opts) {
    return !!opts.find((o) => o.enableSubscriptions);
}
exports.areSubscriptionsEnabled = areSubscriptionsEnabled;
function ResolverSubscription(typeFunc, options, ...opts) {
    if (!areSubscriptionsEnabled(opts)) {
        return () => { };
    }
    return (0, common_1.applyDecorators)((0, graphql_1.Subscription)(typeFunc, options), (0, resolver_method_decorator_1.ResolverMethod)(...opts));
}
exports.ResolverSubscription = ResolverSubscription;
//# sourceMappingURL=resolver-subscription.decorator.js.map