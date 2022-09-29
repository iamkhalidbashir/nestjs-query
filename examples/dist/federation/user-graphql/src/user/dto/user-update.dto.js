"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let UserUpdateDTO = class UserUpdateDTO {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserUpdateDTO.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserUpdateDTO.prototype, "email", void 0);
UserUpdateDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('UserUpdate')
], UserUpdateDTO);
exports.UserUpdateDTO = UserUpdateDTO;
//# sourceMappingURL=user-update.dto.js.map