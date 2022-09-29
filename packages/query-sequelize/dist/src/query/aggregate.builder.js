"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBuilder = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = (0, tslib_1.__importDefault)(require("sequelize"));
const common_1 = require("@nestjs/common");
const camel_case_1 = require("camel-case");
var AggregateFuncs;
(function (AggregateFuncs) {
    AggregateFuncs["AVG"] = "AVG";
    AggregateFuncs["SUM"] = "SUM";
    AggregateFuncs["COUNT"] = "COUNT";
    AggregateFuncs["MAX"] = "MAX";
    AggregateFuncs["MIN"] = "MIN";
})(AggregateFuncs || (AggregateFuncs = {}));
const AGG_REGEXP = /(AVG|SUM|COUNT|MAX|MIN|GROUP_BY)_(.*)/;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class AggregateBuilder {
    constructor(model) {
        this.model = model;
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static convertToAggregateResponse(rawAggregates) {
        return rawAggregates.map((aggregate) => {
            return Object.keys(aggregate).reduce((agg, resultField) => {
                const matchResult = AGG_REGEXP.exec(resultField);
                if (!matchResult) {
                    throw new Error('Unknown aggregate column encountered.');
                }
                const [matchedFunc, matchedFieldName] = matchResult.slice(1);
                const aggResponseKey = (0, camel_case_1.camelCase)(matchedFunc.toLowerCase());
                const fieldName = matchedFieldName;
                const aggResult = agg[aggResponseKey] || {};
                return {
                    ...agg,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    [aggResponseKey]: { ...aggResult, [fieldName]: aggregate[resultField] },
                };
            }, {});
        });
    }
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate) {
        const selects = [
            ...this.createGroupBySelect(aggregate.groupBy),
            ...this.createAggSelect(AggregateFuncs.COUNT, aggregate.count),
            ...this.createAggSelect(AggregateFuncs.SUM, aggregate.sum),
            ...this.createAggSelect(AggregateFuncs.AVG, aggregate.avg),
            ...this.createAggSelect(AggregateFuncs.MAX, aggregate.max),
            ...this.createAggSelect(AggregateFuncs.MIN, aggregate.min),
        ];
        if (!selects.length) {
            throw new common_1.BadRequestException('No aggregate fields found.');
        }
        return {
            attributes: selects,
        };
    }
    createAggSelect(func, fields) {
        if (!fields) {
            return [];
        }
        return fields.map((field) => {
            const aggAlias = `${func}_${field}`;
            const colName = this.model.rawAttributes[field].field;
            const fn = sequelize_1.default.fn(func, sequelize_1.default.col(colName || field));
            return [fn, aggAlias];
        });
    }
    createGroupBySelect(fields) {
        if (!fields) {
            return [];
        }
        return fields.map((field) => {
            const colName = this.model.rawAttributes[field].field;
            return [sequelize_1.default.col(colName || field), `GROUP_BY_${field}`];
        });
    }
}
exports.AggregateBuilder = AggregateBuilder;
//# sourceMappingURL=aggregate.builder.js.map