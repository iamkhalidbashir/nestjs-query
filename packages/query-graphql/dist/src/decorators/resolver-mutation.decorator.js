"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverMutation = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const resolver_method_decorator_1 = require("./resolver-method.decorator");
/**
 * @internal
 * Decorator for a graphql `mutation` endpoint.
 * @param typeFunc - A function that returns the return type for the mutation.
 * @param options - `@nestjs/graphql` options to apply to the mutation.
 * @param opts -  [[ResolverMethodOpts]] to apply to the mutation
 */
function ResolverMutation(typeFunc, options, ...opts) {
    if ((0, resolver_method_decorator_1.isDisabled)(opts)) {
        return () => { };
    }
    return (0, common_1.applyDecorators)((0, graphql_1.Mutation)(typeFunc, options), (0, resolver_method_decorator_1.ResolverMethod)(...opts));
}
exports.ResolverMutation = ResolverMutation;
//# sourceMappingURL=resolver-mutation.decorator.js.map