"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInputDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let LoginInputDTO = class LoginInputDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginInputDTO.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginInputDTO.prototype, "password", void 0);
LoginInputDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], LoginInputDTO);
exports.LoginInputDTO = LoginInputDTO;
//# sourceMappingURL=login-input.dto.js.map