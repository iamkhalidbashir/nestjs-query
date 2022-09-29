"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultHook = void 0;
const createDefaultHook = (func) => {
    class DefaultHook {
        get run() {
            return func;
        }
    }
    return DefaultHook;
};
exports.createDefaultHook = createDefaultHook;
//# sourceMappingURL=default.hook.js.map