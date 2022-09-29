"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionFilterInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const query_1 = require("./query");
/**
 * Input abstract type for all subscription filters.
 * @param DTOClass - The DTO used to create a FilterType for the filter.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function SubscriptionFilterInputType(DTOClass) {
    const F = (0, query_1.SubscriptionFilterType)(DTOClass);
    let SubscriptionFilterInput = class SubscriptionFilterInput {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => F, {
            description: 'Specify to filter the records returned.',
        }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => F),
        (0, tslib_1.__metadata)("design:type", Object)
    ], SubscriptionFilterInput.prototype, "filter", void 0);
    SubscriptionFilterInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)({ isAbstract: true })
    ], SubscriptionFilterInput);
    return SubscriptionFilterInput;
}
exports.SubscriptionFilterInputType = SubscriptionFilterInputType;
//# sourceMappingURL=subscription-filter-input.type.js.map