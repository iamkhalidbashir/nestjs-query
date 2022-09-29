"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UserInputDTO = class UserInputDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserInputDTO.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserInputDTO.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserInputDTO.prototype, "emailAddress", void 0);
UserInputDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('UserInput')
], UserInputDTO);
exports.UserInputDTO = UserInputDTO;
//# sourceMappingURL=user-input.dto.js.map