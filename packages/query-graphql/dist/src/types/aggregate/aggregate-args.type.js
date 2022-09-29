"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const query_1 = require("../query");
/**
 * The args type for aggregate queries
 * @param DTOClass - The class the aggregate is for. This will be used to create FilterType.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function AggregateArgsType(DTOClass) {
    const F = (0, query_1.AggregateFilterType)(DTOClass);
    let AggregateArgs = class AggregateArgs {
    };
    (0, tslib_1.__decorate)([
        (0, class_transformer_1.Type)(() => F),
        (0, class_validator_1.ValidateNested)(),
        (0, graphql_1.Field)(() => F, { nullable: true, description: 'Filter to find records to aggregate on' }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], AggregateArgs.prototype, "filter", void 0);
    AggregateArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], AggregateArgs);
    return AggregateArgs;
}
exports.AggregateArgsType = AggregateArgsType;
//# sourceMappingURL=aggregate-args.type.js.map