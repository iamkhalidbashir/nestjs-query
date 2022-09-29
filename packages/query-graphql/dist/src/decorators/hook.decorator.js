"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHooksForType = exports.BeforeFindOne = exports.BeforeQueryMany = exports.BeforeDeleteMany = exports.BeforeDeleteOne = exports.BeforeUpdateMany = exports.BeforeUpdateOne = exports.BeforeCreateMany = exports.BeforeCreateOne = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const core_1 = require("@nestjs-query/core");
const hooks_1 = require("../hooks");
const hookMetaDataKey = (hookType) => `nestjs-query:${hookType}`;
const hookDecorator = (hookType) => {
    const key = hookMetaDataKey(hookType);
    const getHook = (hook) => {
        if ((0, hooks_1.isHookClass)(hook)) {
            return hook;
        }
        const defaultHook = (0, hooks_1.createDefaultHook)(hook);
        return defaultHook;
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (data) => 
    // eslint-disable-next-line @typescript-eslint/ban-types
    (target) => {
        const hooks = Array.isArray(data) ? data.map((d) => getHook(d)) : [getHook(data)];
        return Reflect.defineMetadata(key, hooks, target);
    };
};
exports.BeforeCreateOne = hookDecorator(hooks_1.HookTypes.BEFORE_CREATE_ONE);
exports.BeforeCreateMany = hookDecorator(hooks_1.HookTypes.BEFORE_CREATE_MANY);
exports.BeforeUpdateOne = hookDecorator(hooks_1.HookTypes.BEFORE_UPDATE_ONE);
exports.BeforeUpdateMany = hookDecorator(hooks_1.HookTypes.BEFORE_UPDATE_MANY);
exports.BeforeDeleteOne = hookDecorator(hooks_1.HookTypes.BEFORE_DELETE_ONE);
exports.BeforeDeleteMany = hookDecorator(hooks_1.HookTypes.BEFORE_DELETE_MANY);
exports.BeforeQueryMany = hookDecorator(hooks_1.HookTypes.BEFORE_QUERY_MANY);
exports.BeforeFindOne = hookDecorator(hooks_1.HookTypes.BEFORE_FIND_ONE);
const getHooksForType = (hookType, DTOClass) => (0, core_1.getClassMetadata)(DTOClass, hookMetaDataKey(hookType), true);
exports.getHooksForType = getHooksForType;
//# sourceMappingURL=hook.decorator.js.map