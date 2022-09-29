"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereBuilder = void 0;
const sequelize_1 = require("sequelize");
const sql_comparison_builder_1 = require("./sql-comparison.builder");
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class WhereBuilder {
    constructor(sqlComparisonBuilder = new sql_comparison_builder_1.SQLComparisonBuilder()) {
        this.sqlComparisonBuilder = sqlComparisonBuilder;
    }
    /**
     * Builds a WHERE clause from a Filter.
     * @param filter - the filter to build the WHERE clause from.
     * @param associations - map of associations that are included in the query.
     */
    build(filter, associations, alias) {
        const { and, or } = filter;
        let ands = [];
        let ors = [];
        let whereOpts = {};
        if (and && and.length) {
            ands = and.map((f) => this.build(f, associations, alias));
        }
        if (or && or.length) {
            ors = or.map((f) => this.build(f, associations, alias));
        }
        const filterAnds = this.filterFields(filter, associations, alias);
        if (filterAnds) {
            ands = [...ands, filterAnds];
        }
        if (ands.length) {
            whereOpts = { ...whereOpts, [sequelize_1.Op.and]: ands };
        }
        if (ors.length) {
            whereOpts = { ...whereOpts, [sequelize_1.Op.or]: ors };
        }
        return whereOpts;
    }
    /**
     * Creates field comparisons from a filter. This method will ignore and/or properties.
     * @param filter - the filter with fields to create comparisons for.
     */
    filterFields(filter, associations, alias) {
        const ands = Object.keys(filter)
            .filter((f) => f !== 'and' && f !== 'or')
            .map((field) => this.withFilterComparison(field, this.getField(filter, field), associations, alias));
        if (ands.length === 1) {
            return ands[0];
        }
        if (ands.length) {
            return { [sequelize_1.Op.and]: ands };
        }
        return undefined;
    }
    getField(obj, field) {
        return obj[field];
    }
    withFilterComparison(field, cmp, associations, alias) {
        var _a, _b, _c;
        if (associations.has(field)) {
            const wb = new WhereBuilder();
            return wb.build(cmp, associations, field);
        }
        let colName = field;
        if (alias && associations.has(alias)) {
            colName = ((_c = (_b = (_a = associations.get(alias)) === null || _a === void 0 ? void 0 : _a.target.rawAttributes[colName]) === null || _b === void 0 ? void 0 : _b.field) !== null && _c !== void 0 ? _c : colName);
        }
        const opts = Object.keys(cmp);
        if (opts.length === 1) {
            const cmpType = opts[0];
            return this.sqlComparisonBuilder.build(colName, cmpType, cmp[cmpType], alias);
        }
        return {
            [sequelize_1.Op.or]: opts.map((cmpType) => this.sqlComparisonBuilder.build(colName, cmpType, cmp[cmpType], alias)),
        };
    }
}
exports.WhereBuilder = WhereBuilder;
//# sourceMappingURL=where.builder.js.map