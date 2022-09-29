"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBuilder = void 0;
const common_1 = require("@nestjs/common");
const camel_case_1 = require("camel-case");
const helpers_1 = require("./helpers");
var AggregateFuncs;
(function (AggregateFuncs) {
    AggregateFuncs["AVG"] = "avg";
    AggregateFuncs["SUM"] = "sum";
    AggregateFuncs["COUNT"] = "count";
    AggregateFuncs["MAX"] = "max";
    AggregateFuncs["MIN"] = "min";
})(AggregateFuncs || (AggregateFuncs = {}));
const AGG_REGEXP = /(avg|sum|count|max|min|group_by)_(.*)/;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class AggregateBuilder {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static convertToAggregateResponse(aggregates) {
        return aggregates.map(({ _id, ...response }) => {
            return { ...this.extractResponse(_id), ...this.extractResponse(response) };
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static extractResponse(response) {
        if (!response) {
            return {};
        }
        return Object.keys(response).reduce((agg, resultField) => {
            const matchResult = AGG_REGEXP.exec(resultField);
            if (!matchResult) {
                throw new Error('Unknown aggregate column encountered.');
            }
            const [matchedFunc, matchedFieldName] = matchResult.slice(1);
            const aggFunc = (0, camel_case_1.camelCase)(matchedFunc.toLowerCase());
            const fieldName = matchedFieldName;
            const aggResult = agg[aggFunc] || {};
            return {
                ...agg,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                [aggFunc]: { ...aggResult, [fieldName]: response[resultField] },
            };
        }, {});
    }
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate) {
        const aggSelect = {
            ...this.createAggSelect(AggregateFuncs.COUNT, aggregate.count),
            ...this.createAggSelect(AggregateFuncs.SUM, aggregate.sum),
            ...this.createAggSelect(AggregateFuncs.AVG, aggregate.avg),
            ...this.createAggSelect(AggregateFuncs.MAX, aggregate.max),
            ...this.createAggSelect(AggregateFuncs.MIN, aggregate.min),
        };
        if (!Object.keys(aggSelect).length) {
            throw new common_1.BadRequestException('No aggregate fields found.');
        }
        return { ...aggSelect, _id: this.createGroupBySelect(aggregate.groupBy) };
    }
    createAggSelect(func, fields) {
        if (!fields) {
            return {};
        }
        return fields.reduce((agg, field) => {
            const aggAlias = `${func}_${field}`;
            const fieldAlias = `$${(0, helpers_1.getSchemaKey)(String(field))}`;
            if (func === 'count') {
                return {
                    ...agg,
                    [aggAlias]: {
                        $sum: {
                            $cond: {
                                if: { $in: [{ $type: fieldAlias }, ['missing', 'null']] },
                                then: 0,
                                else: 1,
                            },
                        },
                    },
                };
            }
            return { ...agg, [aggAlias]: { [`$${func}`]: fieldAlias } };
        }, {});
    }
    createGroupBySelect(fields) {
        if (!fields) {
            return null;
        }
        return fields.reduce((id, field) => {
            const aggAlias = this.getGroupByAlias(field);
            const fieldAlias = `$${(0, helpers_1.getSchemaKey)(String(field))}`;
            return { ...id, [aggAlias]: fieldAlias };
        }, {});
    }
    getGroupBySelects(fields) {
        if (!fields) {
            return undefined;
        }
        // append _id so it pulls the sort from the _id field
        return (fields !== null && fields !== void 0 ? fields : []).map((f) => `_id.${this.getGroupByAlias(f)}`);
    }
    getGroupByAlias(field) {
        return `group_by_${field}`;
    }
}
exports.AggregateBuilder = AggregateBuilder;
//# sourceMappingURL=aggregate.builder.js.map