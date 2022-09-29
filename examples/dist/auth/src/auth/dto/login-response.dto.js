"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDto = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let LoginResponseDto = class LoginResponseDto {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
LoginResponseDto = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('LoginResponse')
], LoginResponseDto);
exports.LoginResponseDto = LoginResponseDto;
//# sourceMappingURL=login-response.dto.js.map