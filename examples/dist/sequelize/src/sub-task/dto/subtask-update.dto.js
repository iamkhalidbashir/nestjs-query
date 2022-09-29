"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskUpdateDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let SubTaskUpdateDTO = class SubTaskUpdateDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskUpdateDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskUpdateDTO.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskUpdateDTO.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], SubTaskUpdateDTO.prototype, "todoItemId", void 0);
SubTaskUpdateDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('SubTaskUpdate')
], SubTaskUpdateDTO);
exports.SubTaskUpdateDTO = SubTaskUpdateDTO;
//# sourceMappingURL=subtask-update.dto.js.map