"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateSortType = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
const decorators_1 = require("../../decorators");
const common_1 = require("../../common");
(0, graphql_1.registerEnumType)(core_1.SortDirection, {
    name: 'SortDirection',
    description: 'Sort Directions', // this one is optional
});
(0, graphql_1.registerEnumType)(core_1.SortNulls, {
    name: 'SortNulls',
    description: 'Sort Nulls Options', // this one is optional
});
const reflector = new core_1.ValueReflector('nestjs-query:sort-type');
function getOrCreateSortType(TClass) {
    return reflector.memoize(TClass, () => {
        const prefix = (0, common_1.getGraphqlObjectName)(TClass, 'Unable to make SortType.');
        const fields = (0, decorators_1.getFilterableFields)(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create SortType for ${TClass.name}. Ensure fields are annotated with @FilterableField`);
        }
        const fieldNames = fields.map((f) => f.propertyName);
        const fieldNameMap = fieldNames.reduce((acc, f) => ({ ...acc, [f]: f }), {});
        (0, graphql_1.registerEnumType)(fieldNameMap, { name: `${prefix}SortFields` });
        let Sort = class Sort {
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => fieldNameMap),
            (0, class_validator_1.IsIn)(fieldNames),
            (0, tslib_1.__metadata)("design:type", Object)
        ], Sort.prototype, "field", void 0);
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => core_1.SortDirection),
            (0, class_validator_1.IsEnum)(core_1.SortDirection),
            (0, tslib_1.__metadata)("design:type", String)
        ], Sort.prototype, "direction", void 0);
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => core_1.SortNulls, { nullable: true }),
            (0, validators_1.IsUndefined)(),
            (0, class_validator_1.IsEnum)(core_1.SortNulls),
            (0, tslib_1.__metadata)("design:type", String)
        ], Sort.prototype, "nulls", void 0);
        Sort = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)(`${prefix}Sort`)
        ], Sort);
        return Sort;
    });
}
exports.getOrCreateSortType = getOrCreateSortType;
//# sourceMappingURL=sorting.type.js.map