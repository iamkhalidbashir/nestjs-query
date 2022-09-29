"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverField = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const resolver_method_decorator_1 = require("./resolver-method.decorator");
/**
 * @internal
 * Decorator for resolving properties on.
 * @param name - the name of the property in graphql.
 * @param typeFunc - A function that returns the return type for the mutation.
 * @param options - `@nestjs/graphql` options to apply to the mutation.
 * @param opts -  [[ResolverMethodOpts]] to apply to the mutation
 */
function ResolverField(name, typeFunc, options, ...opts) {
    if ((0, resolver_method_decorator_1.isDisabled)(opts)) {
        return () => { };
    }
    return (0, common_1.applyDecorators)((0, graphql_1.ResolveField)(name, typeFunc, options), (0, resolver_method_decorator_1.ResolverMethod)(...opts));
}
exports.ResolverField = ResolverField;
//# sourceMappingURL=resolver-field.decorator.js.map