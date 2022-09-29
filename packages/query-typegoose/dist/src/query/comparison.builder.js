"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonBuilder = void 0;
const tslib_1 = require("tslib");
const lodash_escaperegexp_1 = (0, tslib_1.__importDefault)(require("lodash.escaperegexp"));
const common_1 = require("@nestjs/common");
const typegoose_1 = require("@typegoose/typegoose");
const helpers_1 = require("./helpers");
/**
 * @internal
 * Builder to create SQL Comparisons. (=, !=, \>, etc...)
 */
class ComparisonBuilder {
    constructor(Model, comparisonMap = ComparisonBuilder.DEFAULT_COMPARISON_MAP) {
        this.Model = Model;
        this.comparisonMap = comparisonMap;
    }
    /**
     * Creates a valid SQL fragment with parameters.
     *
     * @param field - the property in Entity to create the comparison for.
     * @param cmp - the FilterComparisonOperator (eq, neq, gt, etc...)
     * @param val - the value to compare to.
     */
    build(field, cmp, val) {
        const schemaKey = (0, helpers_1.getSchemaKey)(`${String(field)}`);
        const normalizedCmp = cmp.toLowerCase();
        let querySelector;
        if (this.comparisonMap[normalizedCmp]) {
            // comparison operator (e.b. =, !=, >, <)
            querySelector = {
                [this.comparisonMap[normalizedCmp]]: this.convertQueryValue(field, val),
            };
        }
        if (normalizedCmp.includes('like')) {
            querySelector = this.likeComparison(normalizedCmp, val);
        }
        if (normalizedCmp.includes('between')) {
            querySelector = this.betweenComparison(normalizedCmp, field, val);
        }
        if (!querySelector) {
            throw new common_1.BadRequestException(`unknown operator ${JSON.stringify(cmp)}`);
        }
        return { [schemaKey]: querySelector };
    }
    betweenComparison(cmp, field, val) {
        if (!this.isBetweenVal(val)) {
            throw new Error(`Invalid value for ${cmp} expected {lower: val, upper: val} got ${JSON.stringify(val)}`);
        }
        if (cmp === 'notbetween') {
            return { $lt: this.convertQueryValue(field, val.lower), $gt: this.convertQueryValue(field, val.upper) };
        }
        return { $gte: this.convertQueryValue(field, val.lower), $lte: this.convertQueryValue(field, val.upper) };
    }
    isBetweenVal(val) {
        return val !== null && typeof val === 'object' && 'lower' in val && 'upper' in val;
    }
    likeComparison(cmp, val) {
        const regExpStr = (0, lodash_escaperegexp_1.default)(`${String(val)}`).replace(/%/g, '.*');
        const regExp = new RegExp(regExpStr, cmp.includes('ilike') ? 'i' : undefined);
        if (cmp.startsWith('not')) {
            return { $not: { $regex: regExp } };
        }
        return { $regex: regExp };
    }
    convertQueryValue(field, val) {
        const schemaType = this.Model.schema.path((0, helpers_1.getSchemaKey)(field));
        if (!schemaType) {
            throw new common_1.BadRequestException(`unknown comparison field ${String(field)}`);
        }
        if (schemaType instanceof typegoose_1.mongoose.Schema.Types.ObjectId) {
            return this.convertToObjectId(val);
        }
        return val;
    }
    convertToObjectId(val) {
        if (Array.isArray(val)) {
            return val.map((v) => this.convertToObjectId(v));
        }
        if (typeof val === 'string' || typeof val === 'number') {
            if (typegoose_1.mongoose.Types.ObjectId.isValid(val)) {
                return typegoose_1.mongoose.Types.ObjectId(val);
            }
        }
        return val;
    }
}
exports.ComparisonBuilder = ComparisonBuilder;
ComparisonBuilder.DEFAULT_COMPARISON_MAP = {
    eq: '$eq',
    neq: '$ne',
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte',
    in: '$in',
    notin: '$nin',
    is: '$eq',
    isnot: '$ne',
};
//# sourceMappingURL=comparison.builder.js.map