"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHookClass = void 0;
function isHookClass(hook) {
    return typeof hook === 'function' && 'prototype' in hook && 'run' in hook.prototype;
}
exports.isHookClass = isHookClass;
//# sourceMappingURL=hooks.js.map