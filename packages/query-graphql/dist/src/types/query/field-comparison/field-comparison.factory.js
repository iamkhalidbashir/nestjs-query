"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterComparisonType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const validators_1 = require("../../validators");
const float_field_comparison_type_1 = require("./float-field-comparison.type");
const int_field_comparison_type_1 = require("./int-field-comparison.type");
const string_field_comparison_type_1 = require("./string-field-comparison.type");
const boolean_field_comparison_type_1 = require("./boolean-field-comparison.type");
const number_field_comparison_type_1 = require("./number-field-comparison.type");
const date_field_comparison_type_1 = require("./date-field-comparison.type");
const timestamp_field_comparison_type_1 = require("./timestamp-field-comparison.type");
const decorators_1 = require("../../../decorators");
const common_1 = require("../../../common");
const helpers_1 = require("../helpers");
/** @internal */
const filterComparisonMap = new Map();
filterComparisonMap.set('StringFilterComparison', string_field_comparison_type_1.getOrCreateStringFieldComparison);
filterComparisonMap.set('NumberFilterComparison', number_field_comparison_type_1.getOrCreateNumberFieldComparison);
filterComparisonMap.set('IntFilterComparison', int_field_comparison_type_1.getOrCreateIntFieldComparison);
filterComparisonMap.set('FloatFilterComparison', float_field_comparison_type_1.getOrCreateFloatFieldComparison);
filterComparisonMap.set('BooleanFilterComparison', boolean_field_comparison_type_1.getOrCreateBooleanFieldComparison);
filterComparisonMap.set('DateFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('DateTimeFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('TimestampFilterComparison', timestamp_field_comparison_type_1.getOrCreateTimestampFieldComparison);
const knownTypes = new Set([
    String,
    Number,
    Boolean,
    graphql_1.Int,
    graphql_1.Float,
    graphql_1.ID,
    Date,
    graphql_1.GraphQLISODateTime,
    graphql_1.GraphQLTimestamp,
]);
/** @internal */
const getTypeName = (SomeType) => {
    if (knownTypes.has(SomeType) || (0, core_1.isNamed)(SomeType)) {
        const typeName = SomeType.name;
        return (0, upper_case_first_1.upperCaseFirst)(typeName);
    }
    if (typeof SomeType === 'object') {
        const enumType = (0, common_1.getGraphqlEnumMetadata)(SomeType);
        if (enumType) {
            return (0, upper_case_first_1.upperCaseFirst)(enumType.name);
        }
    }
    throw new Error(`Unable to create filter comparison for ${JSON.stringify(SomeType)}.`);
};
const isCustomFieldComparison = (options) => !!options.allowedComparisons;
const getComparisonTypeName = (fieldType, options) => {
    if (isCustomFieldComparison(options)) {
        return `${(0, upper_case_first_1.upperCaseFirst)(options.fieldName)}FilterComparison`;
    }
    return `${getTypeName(fieldType)}FilterComparison`;
};
/** @internal */
function createFilterComparisonType(options) {
    const { FieldType, returnTypeFunc } = options;
    const fieldType = returnTypeFunc ? returnTypeFunc() : FieldType;
    const inputName = getComparisonTypeName(fieldType, options);
    const generator = filterComparisonMap.get(inputName);
    if (generator) {
        return generator();
    }
    const isNotAllowed = (val) => () => !(0, helpers_1.isInAllowedList)(options.allowedComparisons, val);
    let Fc = class Fc {
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('is'), (0, graphql_1.Field)(() => Boolean, { nullable: true })),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "is", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('isNot'), (0, graphql_1.Field)(() => Boolean, { nullable: true })),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "isNot", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('eq'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "eq", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('neq'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "neq", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('gt'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "gt", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('gte'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "gte", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('lt'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "lt", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('lte'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "lte", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('like'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "like", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('notLike'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "notLike", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('iLike'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "iLike", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('notILike'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Object)
    ], Fc.prototype, "notILike", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('in'), (0, graphql_1.Field)(() => [fieldType], { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Array)
    ], Fc.prototype, "in", void 0);
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(isNotAllowed('notIn'), (0, graphql_1.Field)(() => [fieldType], { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, tslib_1.__metadata)("design:type", Array)
    ], Fc.prototype, "notIn", void 0);
    Fc = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(inputName)
    ], Fc);
    filterComparisonMap.set(inputName, () => Fc);
    return Fc;
}
exports.createFilterComparisonType = createFilterComparisonType;
//# sourceMappingURL=field-comparison.factory.js.map