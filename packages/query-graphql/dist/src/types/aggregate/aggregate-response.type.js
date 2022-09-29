"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateResponseType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../../decorators");
const common_1 = require("../../common");
const reflector = new core_1.MapReflector('nestjs-query:aggregate-response-type');
function NumberAggregatedType(name, fields, NumberType) {
    const fieldNames = fields.map((f) => f.propertyName);
    let Aggregated = class Aggregated {
    };
    Aggregated = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fieldNames.forEach((propertyName) => {
        (0, graphql_1.Field)(() => NumberType, { nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregateGroupByType(name, fields) {
    let Aggregated = class Aggregated {
    };
    Aggregated = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fields.forEach(({ propertyName, target, returnTypeFunc }) => {
        const rt = returnTypeFunc ? returnTypeFunc() : target;
        (0, graphql_1.Field)(() => rt, { nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregatedType(name, fields) {
    let Aggregated = class Aggregated {
    };
    Aggregated = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fields.forEach(({ propertyName, target, returnTypeFunc }) => {
        const rt = returnTypeFunc ? returnTypeFunc() : target;
        (0, graphql_1.Field)(() => rt, { nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregateResponseType(DTOClass, opts) {
    var _a;
    const objName = (0, common_1.getGraphqlObjectName)(DTOClass, 'Unable to make AggregationResponseType.');
    const prefix = (_a = opts === null || opts === void 0 ? void 0 : opts.prefix) !== null && _a !== void 0 ? _a : objName;
    const aggName = `${prefix}AggregateResponse`;
    return reflector.memoize(DTOClass, aggName, () => {
        const fields = (0, decorators_1.getFilterableFields)(DTOClass);
        if (!fields.length) {
            throw new Error(`No fields found to create AggregationResponseType for ${DTOClass.name}. Ensure fields are annotated with @FilterableField`);
        }
        const numberFields = fields.filter(({ target }) => target === Number);
        const minMaxFields = fields.filter(({ target }) => target !== Boolean);
        const GroupType = AggregateGroupByType(`${prefix}AggregateGroupBy`, fields);
        const CountType = NumberAggregatedType(`${prefix}CountAggregate`, fields, graphql_1.Int);
        const SumType = NumberAggregatedType(`${prefix}SumAggregate`, numberFields, graphql_1.Float);
        const AvgType = NumberAggregatedType(`${prefix}AvgAggregate`, numberFields, graphql_1.Float);
        const MinType = AggregatedType(`${prefix}MinAggregate`, minMaxFields);
        const MaxType = AggregatedType(`${prefix}MaxAggregate`, minMaxFields);
        let AggResponse = class AggResponse {
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => GroupType, { nullable: true }),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "groupBy", void 0);
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => CountType, { nullable: true }),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "count", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.SkipIf)(() => numberFields.length === 0, (0, graphql_1.Field)(() => SumType, { nullable: true })),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "sum", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.SkipIf)(() => numberFields.length === 0, (0, graphql_1.Field)(() => AvgType, { nullable: true })),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "avg", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.SkipIf)(() => minMaxFields.length === 0, (0, graphql_1.Field)(() => MinType, { nullable: true })),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "min", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.SkipIf)(() => minMaxFields.length === 0, (0, graphql_1.Field)(() => MaxType, { nullable: true })),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AggResponse.prototype, "max", void 0);
        AggResponse = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(aggName)
        ], AggResponse);
        return AggResponse;
    });
}
exports.AggregateResponseType = AggregateResponseType;
//# sourceMappingURL=aggregate-response.type.js.map