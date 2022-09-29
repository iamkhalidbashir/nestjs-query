"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateCursorPagingType = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const cursor_scalar_1 = require("../../cursor.scalar");
const validators_1 = require("../../validators");
const constants_1 = require("./constants");
/** @internal */
let graphQLCursorPaging = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const getOrCreateCursorPagingType = () => {
    if (graphQLCursorPaging) {
        return graphQLCursorPaging;
    }
    // based on https://github.com/MichalLytek/type-graphql/issues/142#issuecomment-433120114
    let GraphQLCursorPagingImpl = class GraphQLCursorPagingImpl {
    };
    GraphQLCursorPagingImpl.strategy = constants_1.PagingStrategies.CURSOR;
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => cursor_scalar_1.ConnectionCursorScalar, {
            nullable: true,
            description: 'Paginate before opaque cursor',
        }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.Validate)(validators_1.CannotUseWithout, ['last']),
        (0, class_validator_1.Validate)(validators_1.CannotUseWith, ['after', 'first']),
        (0, tslib_1.__metadata)("design:type", String)
    ], GraphQLCursorPagingImpl.prototype, "before", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => cursor_scalar_1.ConnectionCursorScalar, {
            nullable: true,
            description: 'Paginate after opaque cursor',
        }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.Validate)(validators_1.CannotUseWithout, ['first']),
        (0, class_validator_1.Validate)(validators_1.CannotUseWith, ['before', 'last']),
        (0, tslib_1.__metadata)("design:type", String)
    ], GraphQLCursorPagingImpl.prototype, "after", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, description: 'Paginate first' }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsPositive)(),
        (0, class_validator_1.Min)(1),
        (0, class_validator_1.Validate)(validators_1.CannotUseWith, ['before', 'last']),
        (0, tslib_1.__metadata)("design:type", Number)
    ], GraphQLCursorPagingImpl.prototype, "first", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, description: 'Paginate last' }),
        (0, validators_1.IsUndefined)()
        // Required `before`. This is a weird corner case.
        // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
        // We'll just ignore it for now.
        ,
        (0, class_validator_1.Validate)(validators_1.CannotUseWithout, ['before']),
        (0, class_validator_1.Validate)(validators_1.CannotUseWith, ['after', 'first']),
        (0, class_validator_1.Min)(1),
        (0, class_validator_1.IsPositive)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], GraphQLCursorPagingImpl.prototype, "last", void 0);
    GraphQLCursorPagingImpl = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)('CursorPaging')
    ], GraphQLCursorPagingImpl);
    graphQLCursorPaging = GraphQLCursorPagingImpl;
    return graphQLCursorPaging;
};
exports.getOrCreateCursorPagingType = getOrCreateCursorPagingType;
//# sourceMappingURL=cursor-paging.type.js.map