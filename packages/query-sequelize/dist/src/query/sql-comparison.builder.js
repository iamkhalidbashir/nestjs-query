"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLComparisonBuilder = void 0;
const sequelize_1 = require("sequelize");
/**
 * @internal
 * Builder to create SQL Comparisons. (=, !=, \>, etc...)
 */
class SQLComparisonBuilder {
    constructor(comparisonMap = SQLComparisonBuilder.DEFAULT_COMPARISON_MAP) {
        this.comparisonMap = comparisonMap;
    }
    /**
     * Creates a valid SQL fragment with parameters.
     *
     * @param field - the property in Entity to create the comparison for.
     * @param cmp - the FilterComparisonOperator (eq, neq, gt, etc...)
     * @param val - the value to compare to.
     */
    build(field, cmp, val, alias) {
        const col = alias ? `$${alias}.${field}$` : `${field}`;
        const normalizedCmp = cmp.toLowerCase();
        if (this.comparisonMap[normalizedCmp]) {
            // comparison operator (e.b. =, !=, >, <)
            return { [col]: { [this.comparisonMap[normalizedCmp]]: val } };
        }
        if (normalizedCmp === 'between') {
            // between comparison (field BETWEEN x AND y)
            return this.betweenComparisonSQL(col, val);
        }
        if (normalizedCmp === 'notbetween') {
            // notBetween comparison (field NOT BETWEEN x AND y)
            return this.notBetweenComparisonSQL(col, val);
        }
        throw new Error(`unknown operator ${JSON.stringify(cmp)}`);
    }
    betweenComparisonSQL(col, val) {
        if (this.isBetweenVal(val)) {
            return {
                [col]: { [sequelize_1.Op.between]: [val.lower, val.upper] },
            };
        }
        throw new Error(`Invalid value for between expected {lower: val, upper: val} got ${JSON.stringify(val)}`);
    }
    notBetweenComparisonSQL(col, val) {
        if (this.isBetweenVal(val)) {
            return {
                [col]: { [sequelize_1.Op.notBetween]: [val.lower, val.upper] },
            };
        }
        throw new Error(`Invalid value for not between expected {lower: val, upper: val} got ${JSON.stringify(val)}`);
    }
    isBetweenVal(val) {
        return val !== null && typeof val === 'object' && 'lower' in val && 'upper' in val;
    }
}
exports.SQLComparisonBuilder = SQLComparisonBuilder;
SQLComparisonBuilder.DEFAULT_COMPARISON_MAP = {
    eq: sequelize_1.Op.eq,
    neq: sequelize_1.Op.ne,
    gt: sequelize_1.Op.gt,
    gte: sequelize_1.Op.gte,
    lt: sequelize_1.Op.lt,
    lte: sequelize_1.Op.lte,
    like: sequelize_1.Op.like,
    in: sequelize_1.Op.in,
    notin: sequelize_1.Op.notIn,
    notlike: sequelize_1.Op.notLike,
    ilike: sequelize_1.Op.iLike,
    notilike: sequelize_1.Op.notILike,
    is: sequelize_1.Op.is,
    isnot: sequelize_1.Op.not,
};
//# sourceMappingURL=sql-comparison.builder.js.map