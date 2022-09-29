"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOneInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_1 = require("../common");
/**
 * The abstract input type for update one endpoints.
 * @param DTOClass - The base DTO class the UpdateType is based on.
 * @param UpdateType - The InputType to use for the update field.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function UpdateOneInputType(DTOClass, UpdateType) {
    const IDType = (0, common_1.getDTOIdTypeOrDefault)([DTOClass, UpdateType]);
    let UpdateOneInput = class UpdateOneInput {
    };
    (0, tslib_1.__decorate)([
        (0, class_validator_1.IsNotEmpty)(),
        (0, graphql_1.Field)(() => IDType, { description: 'The id of the record to update' }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], UpdateOneInput.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, class_transformer_1.Type)(() => UpdateType),
        (0, class_validator_1.ValidateNested)(),
        (0, graphql_1.Field)(() => UpdateType, { description: 'The update to apply.' }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], UpdateOneInput.prototype, "update", void 0);
    UpdateOneInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)({ isAbstract: true })
    ], UpdateOneInput);
    return UpdateOneInput;
}
exports.UpdateOneInputType = UpdateOneInputType;
//# sourceMappingURL=update-one-input.type.js.map