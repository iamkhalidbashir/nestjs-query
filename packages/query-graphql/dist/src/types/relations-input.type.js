"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsInputType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_1 = require("../common");
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function RelationsInputType(DTOClass, RelationClass) {
    const DTOIDType = (0, common_1.getDTOIdTypeOrDefault)([DTOClass]);
    const RelationIDType = (0, common_1.getDTOIdTypeOrDefault)([RelationClass]);
    let RelationsInput = class RelationsInput {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => DTOIDType, { description: 'The id of the record.' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, tslib_1.__metadata)("design:type", Object)
    ], RelationsInput.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => [RelationIDType], { description: 'The ids of the relations.' }),
        (0, class_validator_1.ArrayUnique)(),
        (0, class_validator_1.IsNotEmpty)({ each: true }),
        (0, tslib_1.__metadata)("design:type", Array)
    ], RelationsInput.prototype, "relationIds", void 0);
    RelationsInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)({ isAbstract: true })
    ], RelationsInput);
    return RelationsInput;
}
exports.RelationsInputType = RelationsInputType;
//# sourceMappingURL=relations-input.type.js.map