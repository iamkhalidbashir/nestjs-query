"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateDateFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let dateFieldComparison;
/** @internal */
function getOrCreateDateFieldComparison() {
    if (dateFieldComparison) {
        return dateFieldComparison;
    }
    let DateFieldComparisonBetween = class DateFieldComparisonBetween {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: false }),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparisonBetween.prototype, "lower", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: false }),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparisonBetween.prototype, "upper", void 0);
    DateFieldComparisonBetween = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], DateFieldComparisonBetween);
    let DateFieldComparison = class DateFieldComparison {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], DateFieldComparison.prototype, "is", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], DateFieldComparison.prototype, "isNot", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "eq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "neq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "gt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "gte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "lt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], DateFieldComparison.prototype, "lte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [graphql_1.GraphQLISODateTime], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], DateFieldComparison.prototype, "in", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [graphql_1.GraphQLISODateTime], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], DateFieldComparison.prototype, "notIn", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => DateFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => DateFieldComparisonBetween),
        (0, tslib_1.__metadata)("design:type", DateFieldComparisonBetween)
    ], DateFieldComparison.prototype, "between", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => DateFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => DateFieldComparisonBetween),
        (0, tslib_1.__metadata)("design:type", DateFieldComparisonBetween)
    ], DateFieldComparison.prototype, "notBetween", void 0);
    DateFieldComparison = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)('DateFieldComparison')
    ], DateFieldComparison);
    dateFieldComparison = DateFieldComparison;
    return dateFieldComparison;
}
exports.getOrCreateDateFieldComparison = getOrCreateDateFieldComparison;
//# sourceMappingURL=date-field-comparison.type.js.map