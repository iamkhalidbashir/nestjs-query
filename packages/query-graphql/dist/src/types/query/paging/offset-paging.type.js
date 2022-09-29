"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateOffsetPagingType = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const validators_1 = require("../../validators");
const constants_1 = require("./constants");
let graphQLPaging = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const getOrCreateOffsetPagingType = () => {
    if (graphQLPaging) {
        return graphQLPaging;
    }
    let GraphQLPagingImpl = class GraphQLPagingImpl {
    };
    GraphQLPagingImpl.strategy = constants_1.PagingStrategies.OFFSET;
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, {
            nullable: true,
            description: 'Limit the number of records returned',
        }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsInt)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], GraphQLPagingImpl.prototype, "limit", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, {
            nullable: true,
            description: 'Offset to start returning records from',
        }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsInt)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], GraphQLPagingImpl.prototype, "offset", void 0);
    GraphQLPagingImpl = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)('OffsetPaging')
    ], GraphQLPagingImpl);
    graphQLPaging = GraphQLPagingImpl;
    return graphQLPaging;
};
exports.getOrCreateOffsetPagingType = getOrCreateOffsetPagingType;
//# sourceMappingURL=offset-paging.type.js.map