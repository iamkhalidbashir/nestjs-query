"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateQueryParam = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_fields_1 = (0, tslib_1.__importDefault)(require("graphql-fields"));
const EXCLUDED_FIELDS = ['__typename'];
const QUERY_OPERATORS = ['groupBy', 'count', 'avg', 'sum', 'min', 'max'];
exports.AggregateQueryParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const info = graphql_1.GqlExecutionContext.create(ctx).getInfo();
    const fields = (0, graphql_fields_1.default)(info, {}, { excludedFields: EXCLUDED_FIELDS });
    return QUERY_OPERATORS.filter((operator) => !!fields[operator]).reduce((query, operator) => {
        const queryFields = Object.keys(fields[operator]);
        if (queryFields && queryFields.length) {
            return { ...query, [operator]: queryFields };
        }
        return query;
    }, {});
});
//# sourceMappingURL=aggregate-query-param.decorator.js.map