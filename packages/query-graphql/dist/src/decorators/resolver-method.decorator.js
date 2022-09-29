"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverMethod = exports.isDisabled = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = require("@nestjs/common");
/**
 * @internal
 * Creates a unique set of items.
 * @param arrs - An array of arrays to de duplicate.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createSetArray(...arrs) {
    const set = new Set(arrs.reduce((acc, arr) => [...acc, ...arr], []));
    return [...set];
}
/**
 * @internal
 * Returns true if any of the [[ResolverMethodOpts]] are disabled.
 * @param opts - The array of [[ResolverMethodOpts]] to check.
 */
function isDisabled(opts) {
    return !!opts.find((o) => o.disabled);
}
exports.isDisabled = isDisabled;
/**
 * @internal
 * Decorator for all ResolverMethods
 *
 * @param opts - the [[ResolverMethodOpts]] to apply.
 */
function ResolverMethod(...opts) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(...createSetArray(...opts.map((o) => { var _a; return (_a = o.guards) !== null && _a !== void 0 ? _a : []; }))), (0, common_1.UseInterceptors)(...createSetArray(...opts.map((o) => { var _a; return (_a = o.interceptors) !== null && _a !== void 0 ? _a : []; }))), (0, common_1.UsePipes)(...createSetArray(...opts.map((o) => { var _a; return (_a = o.pipes) !== null && _a !== void 0 ? _a : []; }))), (0, common_1.UseFilters)(...createSetArray(...opts.map((o) => { var _a; return (_a = o.filters) !== null && _a !== void 0 ? _a : []; }))), ...createSetArray(...opts.map((o) => { var _a; return (_a = o.decorators) !== null && _a !== void 0 ? _a : []; })));
}
exports.ResolverMethod = ResolverMethod;
//# sourceMappingURL=resolver-method.decorator.js.map