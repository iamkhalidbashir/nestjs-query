"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilter = exports.getFilterOmitting = exports.getFilterComparisons = exports.getFilterFields = exports.mergeFilter = exports.transformFilter = exports.getFilterFieldComparison = exports.isComparison = exports.isBooleanComparisonOperators = exports.isRangeComparisonOperators = exports.isBetweenComparisonOperators = exports.isInComparisonOperators = exports.isLikeComparisonOperator = void 0;
const filter_builder_1 = require("./filter.builder");
const isLikeComparisonOperator = (op) => op === 'like' || op === 'notLike' || op === 'iLike' || op === 'notILike';
exports.isLikeComparisonOperator = isLikeComparisonOperator;
const isInComparisonOperators = (op) => op === 'in' || op === 'notIn';
exports.isInComparisonOperators = isInComparisonOperators;
const isBetweenComparisonOperators = (op) => op === 'between' || op === 'notBetween';
exports.isBetweenComparisonOperators = isBetweenComparisonOperators;
const isRangeComparisonOperators = (op) => op === 'gt' || op === 'gte' || op === 'lt' || op === 'lte';
exports.isRangeComparisonOperators = isRangeComparisonOperators;
const isBooleanComparisonOperators = (op) => op === 'eq' || op === 'neq' || op === 'is' || op === 'isNot';
exports.isBooleanComparisonOperators = isBooleanComparisonOperators;
const isComparison = (maybeComparison) => {
    if (!maybeComparison) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(maybeComparison).every((op) => (0, exports.isLikeComparisonOperator)(op) ||
        (0, exports.isInComparisonOperators)(op) ||
        (0, exports.isBetweenComparisonOperators)(op) ||
        (0, exports.isRangeComparisonOperators)(op) ||
        (0, exports.isBooleanComparisonOperators)(op));
};
exports.isComparison = isComparison;
// TODO: test
const getFilterFieldComparison = (obj, field) => obj[field];
exports.getFilterFieldComparison = getFilterFieldComparison;
const transformFilter = (filter, fieldMap) => {
    if (!filter) {
        return undefined;
    }
    return Object.keys(filter).reduce((newFilter, filterField) => {
        var _a;
        if (filterField === 'and' || filterField === 'or') {
            return { ...newFilter, [filterField]: (_a = filter[filterField]) === null || _a === void 0 ? void 0 : _a.map((f) => (0, exports.transformFilter)(f, fieldMap)) };
        }
        const fromField = filterField;
        const otherKey = fieldMap[fromField];
        if (!otherKey) {
            throw new Error(`No corresponding field found for '${filterField}' when transforming Filter`);
        }
        return { ...newFilter, [otherKey]: filter[fromField] };
    }, {});
};
exports.transformFilter = transformFilter;
const mergeFilter = (base, source) => {
    if (!Object.keys(base).length) {
        return source;
    }
    if (!Object.keys(source).length) {
        return base;
    }
    return { and: [source, base] };
};
exports.mergeFilter = mergeFilter;
const getFilterFields = (filter) => {
    const fieldSet = Object.keys(filter).reduce((fields, filterField) => {
        if (filterField === 'and' || filterField === 'or') {
            const andOrFilters = filter[filterField];
            if (andOrFilters !== undefined) {
                return andOrFilters.reduce((andOrFields, andOrFilter) => new Set([...andOrFields, ...(0, exports.getFilterFields)(andOrFilter)]), fields);
            }
        }
        else {
            fields.add(filterField);
        }
        return fields;
    }, new Set());
    return [...fieldSet];
};
exports.getFilterFields = getFilterFields;
const getFilterComparisons = (filter, key) => {
    var _a, _b;
    const results = [];
    if (filter.and || filter.or) {
        const filters = [...((_a = filter.and) !== null && _a !== void 0 ? _a : []), ...((_b = filter.or) !== null && _b !== void 0 ? _b : [])];
        filters.forEach((f) => (0, exports.getFilterComparisons)(f, key).forEach((comparison) => results.push(comparison)));
    }
    const comparison = (0, exports.getFilterFieldComparison)(filter, key);
    if ((0, exports.isComparison)(comparison)) {
        results.push(comparison);
    }
    return [...results];
};
exports.getFilterComparisons = getFilterComparisons;
const getFilterOmitting = (filter, key) => Object.keys(filter).reduce((f, next) => {
    const omitted = { ...f };
    const k = next;
    if (k === 'and' && filter.and) {
        omitted.and = filter.and.map((part) => (0, exports.getFilterOmitting)(part, key));
        if (omitted.and.every((part) => Object.keys(part).length === 0)) {
            delete omitted.and;
        }
    }
    else if (k === 'or' && filter.or) {
        omitted.or = filter.or.map((part) => (0, exports.getFilterOmitting)(part, key));
        if (omitted.or.every((part) => Object.keys(part).length === 0)) {
            delete omitted.or;
        }
    }
    else if (k !== key) {
        omitted[k] = filter[k];
    }
    return omitted;
}, {});
exports.getFilterOmitting = getFilterOmitting;
function applyFilter(dtoOrArray, filter) {
    const filterFunc = filter_builder_1.FilterBuilder.build(filter);
    if (Array.isArray(dtoOrArray)) {
        return dtoOrArray.filter((dto) => filterFunc(dto));
    }
    return filterFunc(dtoOrArray);
}
exports.applyFilter = applyFilter;
//# sourceMappingURL=filter.helpers.js.map