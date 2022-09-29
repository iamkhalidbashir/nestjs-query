"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNonePagingQueryArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const connection_1 = require("../../connection");
const paging_1 = require("../paging");
const constants_1 = require("./constants");
const filter_type_1 = require("../filter.type");
const sorting_type_1 = require("../sorting.type");
function createNonePagingQueryArgsType(DTOClass, opts = { ...constants_1.DEFAULT_QUERY_OPTS, pagingStrategy: paging_1.PagingStrategies.NONE }) {
    var _a, _b;
    const F = (0, filter_type_1.FilterType)(DTOClass);
    const S = (0, sorting_type_1.getOrCreateSortType)(DTOClass);
    const C = (0, connection_1.getOrCreateArrayConnectionType)(DTOClass);
    const P = (0, paging_1.getOrCreateNonePagingType)();
    let QueryArgs = class QueryArgs {
    };
    QueryArgs.SortType = S;
    QueryArgs.FilterType = F;
    QueryArgs.PageType = P;
    QueryArgs.ConnectionType = C;
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => F, {
            defaultValue: !F.hasRequiredFilters ? (_a = opts.defaultFilter) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_QUERY_OPTS.defaultFilter : undefined,
            description: 'Specify to filter the records returned.',
            nullable: false,
        }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => F),
        (0, tslib_1.__metadata)("design:type", Object)
    ], QueryArgs.prototype, "filter", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [S], {
            defaultValue: (_b = opts.defaultSort) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_QUERY_OPTS.defaultSort,
            description: 'Specify to sort results.',
        }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => S),
        (0, tslib_1.__metadata)("design:type", Array)
    ], QueryArgs.prototype, "sorting", void 0);
    QueryArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], QueryArgs);
    return QueryArgs;
}
exports.createNonePagingQueryArgsType = createNonePagingQueryArgsType;
//# sourceMappingURL=none-paging-query-args.type.js.map