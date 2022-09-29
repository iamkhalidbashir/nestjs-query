"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateStringFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let stringFieldComparison;
/** @internal */
function getOrCreateStringFieldComparison() {
    if (stringFieldComparison) {
        return stringFieldComparison;
    }
    let StringFieldComparison = class StringFieldComparison {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], StringFieldComparison.prototype, "is", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], StringFieldComparison.prototype, "isNot", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "eq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "neq", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "gt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "gte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "lt", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "lte", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "like", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "notLike", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "iLike", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsString)(),
        (0, validators_1.IsUndefined)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], StringFieldComparison.prototype, "notILike", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [String], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsString)({ each: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], StringFieldComparison.prototype, "in", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [String], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsString)({ each: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], StringFieldComparison.prototype, "notIn", void 0);
    StringFieldComparison = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], StringFieldComparison);
    stringFieldComparison = StringFieldComparison;
    return stringFieldComparison;
}
exports.getOrCreateStringFieldComparison = getOrCreateStringFieldComparison;
//# sourceMappingURL=string-field-comparison.type.js.map