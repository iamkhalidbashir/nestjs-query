"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateFloatFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validators_1 = require("../../validators");
/** @internal */
let floatFieldComparison;
/** @internal */
function getOrCreateFloatFieldComparison() {
    if (floatFieldComparison) {
        return floatFieldComparison;
    }
    let FloatFieldComparisonBetween = class FloatFieldComparisonBetween {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: false }),
        (0, class_validator_1.IsNumber)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparisonBetween.prototype, "lower", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: false }),
        (0, class_validator_1.IsNumber)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparisonBetween.prototype, "upper", void 0);
    FloatFieldComparisonBetween = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], FloatFieldComparisonBetween);
    let FloatFieldComparison = class FloatFieldComparison {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], FloatFieldComparison.prototype, "is", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], FloatFieldComparison.prototype, "isNot", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "eq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "neq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "gt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "gte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "lt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], FloatFieldComparison.prototype, "lte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [graphql_1.Float], { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Array)
    ], FloatFieldComparison.prototype, "in", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [graphql_1.Float], { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", Array)
    ], FloatFieldComparison.prototype, "notIn", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => FloatFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => FloatFieldComparisonBetween),
        (0, tslib_1.__metadata)("design:type", FloatFieldComparisonBetween)
    ], FloatFieldComparison.prototype, "between", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => FloatFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => FloatFieldComparisonBetween),
        (0, tslib_1.__metadata)("design:type", FloatFieldComparisonBetween)
    ], FloatFieldComparison.prototype, "notBetween", void 0);
    FloatFieldComparison = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], FloatFieldComparison);
    floatFieldComparison = FloatFieldComparison;
    return floatFieldComparison;
}
exports.getOrCreateFloatFieldComparison = getOrCreateFloatFieldComparison;
//# sourceMappingURL=float-field-comparison.type.js.map