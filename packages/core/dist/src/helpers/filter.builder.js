"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const comparison_builder_1 = require("./comparison.builder");
const filter_helpers_1 = require("./filter.helpers");
class FilterBuilder {
    static build(filter) {
        const { and, or } = filter;
        const filters = [];
        if (and && and.length) {
            filters.push(this.andFilterFn(...and.map((f) => this.build(f))));
        }
        if (or && or.length) {
            filters.push(this.orFilterFn(...or.map((f) => this.build(f))));
        }
        if (Object.keys(filter).length) {
            filters.push(this.filterFieldsOrNested(filter));
        }
        return this.andFilterFn(...filters);
    }
    static andFilterFn(...filterFns) {
        return (dto) => filterFns.every((filter) => filter(dto));
    }
    static orFilterFn(...filterFns) {
        return (dto) => filterFns.some((filter) => filter(dto));
    }
    static filterFieldsOrNested(filter) {
        return this.andFilterFn(...Object.keys(filter)
            .filter((k) => k !== 'and' && k !== 'or')
            .map((fieldOrNested) => this.withComparison(filter, fieldOrNested)));
    }
    static withFilterComparison(field, cmp) {
        const operators = Object.keys(cmp);
        return this.orFilterFn(...operators.map((operator) => comparison_builder_1.ComparisonBuilder.build(field, operator, cmp[operator])));
    }
    static withComparison(filter, fieldOrNested) {
        const value = (0, filter_helpers_1.getFilterFieldComparison)(filter, fieldOrNested);
        if ((0, filter_helpers_1.isComparison)(value)) {
            return this.withFilterComparison(fieldOrNested, value);
        }
        if (typeof value !== 'object') {
            throw new Error(`unknown comparison ${JSON.stringify(fieldOrNested)}`);
        }
        const nestedFilterFn = this.build(value);
        return (dto) => nestedFilterFn(dto ? dto[fieldOrNested] : null);
    }
}
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=filter.builder.js.map