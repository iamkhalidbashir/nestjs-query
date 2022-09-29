"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManyInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const query_1 = require("./query");
/**
 * The abstract input type or delete many endpoints.
 * @param DTOClass - The class the delete many input type is for. This will be used to create FilterType.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function DeleteManyInputType(DTOClass) {
    const F = (0, query_1.DeleteFilterType)(DTOClass);
    let DeleteManyInput = class DeleteManyInput {
    };
    (0, tslib_1.__decorate)([
        (0, class_validator_1.IsNotEmptyObject)(),
        (0, class_transformer_1.Type)(() => F),
        (0, class_validator_1.ValidateNested)(),
        (0, graphql_1.Field)(() => F, { description: 'Filter to find records to delete' }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], DeleteManyInput.prototype, "filter", void 0);
    DeleteManyInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)({ isAbstract: true })
    ], DeleteManyInput);
    return DeleteManyInput;
}
exports.DeleteManyInputType = DeleteManyInputType;
//# sourceMappingURL=delete-many-input.type.js.map