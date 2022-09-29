"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../decorators");
const hooks_1 = require("../hooks");
class DefaultHookInterceptor {
    intercept(context, next) {
        return next.handle();
    }
}
function HookInterceptor(type, ...DTOClasses) {
    const HookedClasses = DTOClasses.find((Cls) => (0, decorators_1.getHooksForType)(type, Cls));
    if (!HookedClasses) {
        return DefaultHookInterceptor;
    }
    const hookToken = (0, hooks_1.getHookToken)(type, HookedClasses);
    let Interceptor = class Interceptor {
        constructor(hooks) {
            this.hooks = hooks;
        }
        intercept(context, next) {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            const ctx = gqlContext.getContext();
            ctx.hooks = this.hooks;
            return next.handle();
        }
    };
    Interceptor = (0, tslib_1.__decorate)([
        (0, common_1.Injectable)(),
        (0, tslib_1.__param)(0, (0, common_1.Inject)(hookToken)),
        (0, tslib_1.__metadata)("design:paramtypes", [Array])
    ], Interceptor);
    Object.defineProperty(Interceptor, 'name', {
        writable: false,
        // set a unique name otherwise DI does not inject a unique one for each request
        value: `${DTOClasses[0].name}${type}HookInterceptor`,
    });
    return Interceptor;
}
exports.HookInterceptor = HookInterceptor;
//# sourceMappingURL=hook.interceptor.js.map