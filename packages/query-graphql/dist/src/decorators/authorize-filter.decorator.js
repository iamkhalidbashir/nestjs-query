"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyRelationAuthorizerFilter = exports.RelationAuthorizerFilter = exports.AuthorizerFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_1 = require("../auth");
function getContext(executionContext) {
    const gqlExecutionContext = graphql_1.GqlExecutionContext.create(executionContext);
    return gqlExecutionContext.getContext();
}
function getAuthorizerFilter(context, authorizationContext) {
    if (!context.authorizer) {
        return undefined;
    }
    return context.authorizer.authorize(context, authorizationContext);
}
function getRelationAuthFilter(context, relationName, authorizationContext) {
    if (!context.authorizer) {
        return undefined;
    }
    return context.authorizer.authorizeRelation(relationName, context, authorizationContext);
}
function getAuthorizationContext(methodName, partialAuthContext) {
    if (!partialAuthContext)
        return new Proxy({}, {
            get: () => {
                throw new Error(`No AuthorizationContext available for method ${methodName.toString()}! Make sure that you provide an AuthorizationContext to your custom methods as argument of the @AuthorizerFilter decorator.`);
            },
        });
    return {
        operationName: methodName.toString(),
        readonly: partialAuthContext.operationGroup === auth_1.OperationGroup.READ ||
            partialAuthContext.operationGroup === auth_1.OperationGroup.AGGREGATE,
        ...partialAuthContext,
    };
}
function AuthorizerFilter(partialAuthContext) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target, propertyKey, parameterIndex) => {
        const authorizationContext = getAuthorizationContext(propertyKey, partialAuthContext);
        return (0, common_1.createParamDecorator)((data, executionContext) => getAuthorizerFilter(getContext(executionContext), authorizationContext))()(target, propertyKey, parameterIndex);
    };
}
exports.AuthorizerFilter = AuthorizerFilter;
function RelationAuthorizerFilter(relationName, partialAuthContext) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target, propertyKey, parameterIndex) => {
        const authorizationContext = getAuthorizationContext(propertyKey, partialAuthContext);
        return (0, common_1.createParamDecorator)((data, executionContext) => getRelationAuthFilter(getContext(executionContext), relationName, authorizationContext))()(target, propertyKey, parameterIndex);
    };
}
exports.RelationAuthorizerFilter = RelationAuthorizerFilter;
function ModifyRelationAuthorizerFilter(relationName, partialAuthContext) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target, propertyKey, parameterIndex) => {
        const authorizationContext = getAuthorizationContext(propertyKey, partialAuthContext);
        return (0, common_1.createParamDecorator)(async (data, executionContext) => {
            const context = getContext(executionContext);
            return {
                filter: await getAuthorizerFilter(context, authorizationContext),
                relationFilter: await getRelationAuthFilter(context, relationName, authorizationContext),
            };
        })()(target, propertyKey, parameterIndex);
    };
}
exports.ModifyRelationAuthorizerFilter = ModifyRelationAuthorizerFilter;
//# sourceMappingURL=authorize-filter.decorator.js.map