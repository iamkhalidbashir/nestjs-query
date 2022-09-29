"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryArgsType = exports.isStaticQueryArgsType = void 0;
const paging_1 = require("./paging");
const query_args_1 = require("./query-args");
const decorators_1 = require("../../decorators");
const common_1 = require("../../common");
const getMergedQueryOpts = (DTOClass, opts) => {
    const decoratorOpts = (0, decorators_1.getQueryOptions)(DTOClass);
    return {
        ...query_args_1.DEFAULT_QUERY_OPTS,
        pagingStrategy: paging_1.PagingStrategies.CURSOR,
        ...(0, common_1.removeUndefinedValues)(decoratorOpts !== null && decoratorOpts !== void 0 ? decoratorOpts : {}),
        ...(0, common_1.removeUndefinedValues)(opts !== null && opts !== void 0 ? opts : {}),
    };
};
// tests if the object is a QueryArgs Class
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
const isStaticQueryArgsType = (obj) => typeof obj === 'function' && 'PageType' in obj && 'SortType' in obj && 'FilterType' in obj;
exports.isStaticQueryArgsType = isStaticQueryArgsType;
function QueryArgsType(DTOClass, opts) {
    // override any options from the DTO with the options passed in
    const mergedOpts = getMergedQueryOpts(DTOClass, opts);
    if (mergedOpts.pagingStrategy === paging_1.PagingStrategies.OFFSET) {
        return (0, query_args_1.createOffsetQueryArgs)(DTOClass, mergedOpts);
    }
    if (mergedOpts.pagingStrategy === paging_1.PagingStrategies.NONE) {
        return (0, query_args_1.createNonePagingQueryArgsType)(DTOClass, mergedOpts);
    }
    return (0, query_args_1.createCursorQueryArgsType)(DTOClass, mergedOpts);
}
exports.QueryArgsType = QueryArgsType;
//# sourceMappingURL=query-args.type.js.map