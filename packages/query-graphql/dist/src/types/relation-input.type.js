"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_1 = require("../common");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function RelationInputType(DTOClass, RelationClass) {
    const DTOIDType = (0, common_1.getDTOIdTypeOrDefault)([DTOClass]);
    const RelationIDType = (0, common_1.getDTOIdTypeOrDefault)([RelationClass]);
    let RelationInput = class RelationInput {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => DTOIDType, { description: 'The id of the record.' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], RelationInput.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => RelationIDType, { description: 'The id of relation.' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], RelationInput.prototype, "relationId", void 0);
    RelationInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)({ isAbstract: true })
    ], RelationInput);
    return RelationInput;
}
exports.RelationInputType = RelationInputType;
//# sourceMappingURL=relation-input.type.js.map