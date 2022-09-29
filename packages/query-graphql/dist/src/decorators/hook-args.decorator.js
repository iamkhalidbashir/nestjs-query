"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationHookArgs = exports.HookArgs = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const decorator_utils_1 = require("./decorator.utils");
function transformValue(value, type) {
    if (type && !(value instanceof type)) {
        return (0, class_transformer_1.plainToClass)(type, value);
    }
    return value;
}
function createArgsDecorator(fn) {
    const dec = (target, methodName, paramIndex) => {
        const params = Reflect.getMetadata('design:paramtypes', target, methodName);
        const ArgType = params[paramIndex];
        return (0, common_1.createParamDecorator)(async (data, executionContext) => {
            const gqlExecutionContext = graphql_1.GqlExecutionContext.create(executionContext);
            const gqlContext = gqlExecutionContext.getContext();
            const args = gqlExecutionContext.getArgs();
            return fn(transformValue(args, ArgType), gqlContext);
        })()(target, methodName, paramIndex);
    };
    return (0, decorator_utils_1.composeDecorators)((0, graphql_1.Args)(), dec);
}
const HookArgs = () => createArgsDecorator(async (data, context) => {
    if (context.hooks) {
        let hookedArgs = data;
        for (const hook of context.hooks) {
            hookedArgs = (await hook.run(hookedArgs, context));
        }
        return hookedArgs;
    }
    return data;
});
exports.HookArgs = HookArgs;
const MutationHookArgs = () => createArgsDecorator(async (data, context) => {
    if (context.hooks) {
        let hookedArgs = data;
        for (const hook of context.hooks) {
            hookedArgs = (await hook.run(hookedArgs, context));
        }
        return hookedArgs;
    }
    return data;
});
exports.MutationHookArgs = MutationHookArgs;
//# sourceMappingURL=hook-args.decorator.js.map