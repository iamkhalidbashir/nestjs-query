"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function SubscriptionArgsType(InputClass) {
    let SubscriptionArgs = class SubscriptionArgs {
    };
    (0, tslib_1.__decorate)([
        (0, class_transformer_1.Type)(() => InputClass),
        (0, class_validator_1.ValidateNested)(),
        (0, graphql_1.Field)(() => InputClass, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], SubscriptionArgs.prototype, "input", void 0);
    SubscriptionArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], SubscriptionArgs);
    return SubscriptionArgs;
}
exports.SubscriptionArgsType = SubscriptionArgsType;
//# sourceMappingURL=subscription-args.type.js.map