"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonBuilder = void 0;
const filter_helpers_1 = require("./filter.helpers");
const compare = (filter, fallback) => (dto) => dto ? filter(dto) : fallback;
class ComparisonBuilder {
    static build(field, cmp, val) {
        if ((0, filter_helpers_1.isBooleanComparisonOperators)(cmp)) {
            return this.booleanComparison(cmp, field, val);
        }
        if ((0, filter_helpers_1.isRangeComparisonOperators)(cmp)) {
            return this.rangeComparison(cmp, field, val);
        }
        if ((0, filter_helpers_1.isInComparisonOperators)(cmp)) {
            return this.inComparison(cmp, field, val);
        }
        if ((0, filter_helpers_1.isLikeComparisonOperator)(cmp)) {
            return this.likeComparison(cmp, field, val);
        }
        if ((0, filter_helpers_1.isBetweenComparisonOperators)(cmp)) {
            return this.betweenComparison(cmp, field, val);
        }
        throw new Error(`unknown operator ${JSON.stringify(cmp)}`);
    }
    static booleanComparison(cmp, field, val) {
        if (cmp === 'neq') {
            return (dto) => (dto ? dto[field] : null) !== val;
        }
        if (cmp === 'isNot') {
            // eslint-disable-next-line eqeqeq
            return (dto) => (dto ? dto[field] : null) != val;
        }
        if (cmp === 'eq') {
            return (dto) => (dto ? dto[field] : null) === val;
        }
        // eslint-disable-next-line eqeqeq
        return (dto) => (dto ? dto[field] : null) == val;
    }
    static rangeComparison(cmp, field, val) {
        if (cmp === 'gt') {
            return compare((dto) => dto[field] > val, false);
        }
        if (cmp === 'gte') {
            return compare((dto) => dto[field] >= val, false);
        }
        if (cmp === 'lt') {
            return compare((dto) => dto[field] < val, false);
        }
        return compare((dto) => dto[field] <= val, false);
    }
    static likeComparison(cmp, field, val) {
        if (cmp === 'like') {
            const likeRegexp = this.likeSearchToRegexp(val);
            return compare((dto) => likeRegexp.test(dto[field]), false);
        }
        if (cmp === 'notLike') {
            const likeRegexp = this.likeSearchToRegexp(val);
            return compare((dto) => !likeRegexp.test(dto[field]), true);
        }
        if (cmp === 'iLike') {
            const likeRegexp = this.likeSearchToRegexp(val, true);
            return compare((dto) => likeRegexp.test(dto[field]), false);
        }
        const likeRegexp = this.likeSearchToRegexp(val, true);
        return compare((dto) => !likeRegexp.test(dto[field]), true);
    }
    static inComparison(cmp, field, val) {
        if (cmp === 'notIn') {
            return compare((dto) => !val.includes(dto[field]), true);
        }
        return compare((dto) => val.includes(dto[field]), false);
    }
    static betweenComparison(cmp, field, val) {
        const { lower, upper } = val;
        if (cmp === 'notBetween') {
            return compare((dto) => {
                const dtoVal = dto[field];
                return dtoVal < lower || dtoVal > upper;
            }, true);
        }
        return compare((dto) => {
            const dtoVal = dto[field];
            return dtoVal >= lower && dtoVal <= upper;
        }, false);
    }
    static likeSearchToRegexp(likeStr, caseInsensitive = false) {
        const replaced = likeStr.replace(/%/g, '.*');
        return new RegExp(`^${replaced}$`, caseInsensitive ? 'ig' : 'g');
    }
}
exports.ComparisonBuilder = ComparisonBuilder;
//# sourceMappingURL=comparison.builder.js.map