"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertSort = exports.applyQuery = exports.applyPaging = exports.applySort = exports.mergeQuery = exports.transformQuery = exports.transformSort = void 0;
const tslib_1 = require("tslib");
const lodash_merge_1 = (0, tslib_1.__importDefault)(require("lodash.merge"));
const interfaces_1 = require("../interfaces");
const sort_builder_1 = require("./sort.builder");
const page_builder_1 = require("./page.builder");
const filter_helpers_1 = require("./filter.helpers");
const transformSort = (sorting, fieldMap) => {
    if (!sorting) {
        return undefined;
    }
    return sorting.map((sf) => {
        const field = fieldMap[sf.field];
        if (!field) {
            throw new Error(`No corresponding field found for '${sf.field}' when transforming SortField`);
        }
        return { ...sf, field };
    });
};
exports.transformSort = transformSort;
const transformQuery = (query, fieldMap) => ({
    filter: (0, filter_helpers_1.transformFilter)(query.filter, fieldMap),
    paging: query.paging,
    sorting: (0, exports.transformSort)(query.sorting, fieldMap),
});
exports.transformQuery = transformQuery;
const mergeQuery = (base, source) => (0, lodash_merge_1.default)(base, source);
exports.mergeQuery = mergeQuery;
const applySort = (dtos, sortFields) => sort_builder_1.SortBuilder.build(sortFields)(dtos);
exports.applySort = applySort;
const applyPaging = (dtos, paging) => page_builder_1.PageBuilder.build(paging)(dtos);
exports.applyPaging = applyPaging;
const applyQuery = (dtos, query) => {
    var _a, _b, _c;
    const filtered = (0, filter_helpers_1.applyFilter)(dtos, (_a = query.filter) !== null && _a !== void 0 ? _a : {});
    const sorted = (0, exports.applySort)(filtered, (_b = query.sorting) !== null && _b !== void 0 ? _b : []);
    return (0, exports.applyPaging)(sorted, (_c = query.paging) !== null && _c !== void 0 ? _c : {});
};
exports.applyQuery = applyQuery;
function invertSort(sortFields) {
    return sortFields.map((sf) => {
        const direction = sf.direction === interfaces_1.SortDirection.ASC ? interfaces_1.SortDirection.DESC : interfaces_1.SortDirection.ASC;
        let nulls;
        if (sf.nulls === interfaces_1.SortNulls.NULLS_LAST) {
            nulls = interfaces_1.SortNulls.NULLS_FIRST;
        }
        else if (sf.nulls === interfaces_1.SortNulls.NULLS_FIRST) {
            nulls = interfaces_1.SortNulls.NULLS_LAST;
        }
        return { ...sf, direction, nulls };
    });
}
exports.invertSort = invertSort;
//# sourceMappingURL=query.helpers.js.map