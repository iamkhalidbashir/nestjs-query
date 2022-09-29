"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateBooleanFieldComparison = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
/** @internal */
let booleanFieldComparison;
/** @internal */
function getOrCreateBooleanFieldComparison() {
    if (booleanFieldComparison) {
        return booleanFieldComparison;
    }
    let BooleanFieldComparison = class BooleanFieldComparison {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], BooleanFieldComparison.prototype, "is", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], BooleanFieldComparison.prototype, "isNot", void 0);
    BooleanFieldComparison = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)()
    ], BooleanFieldComparison);
    booleanFieldComparison = BooleanFieldComparison;
    return BooleanFieldComparison;
}
exports.getOrCreateBooleanFieldComparison = getOrCreateBooleanFieldComparison;
//# sourceMappingURL=boolean-field-comparison.type.js.map