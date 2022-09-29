"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeBaseResolverOpts = void 0;
const mergeArrays = (arr1, arr2) => {
    if (arr1 || arr2) {
        return [...(arr1 !== null && arr1 !== void 0 ? arr1 : []), ...(arr2 !== null && arr2 !== void 0 ? arr2 : [])];
    }
    return undefined;
};
const mergeBaseResolverOpts = (into, from) => {
    const guards = mergeArrays(from.guards, into.guards);
    const interceptors = mergeArrays(from.interceptors, into.interceptors);
    const pipes = mergeArrays(from.pipes, into.pipes);
    const filters = mergeArrays(from.filters, into.filters);
    const decorators = mergeArrays(from.decorators, into.decorators);
    return { ...into, guards, interceptors, pipes, filters, decorators };
};
exports.mergeBaseResolverOpts = mergeBaseResolverOpts;
//# sourceMappingURL=resolver.utils.js.map