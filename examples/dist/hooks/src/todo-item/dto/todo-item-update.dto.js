"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemUpdateDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const hooks_1 = require("../../hooks");
let TodoItemUpdateDTO = class TodoItemUpdateDTO {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemUpdateDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemUpdateDTO.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemUpdateDTO.prototype, "priority", void 0);
TodoItemUpdateDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('TodoItemUpdate'),
    (0, query_graphql_1.BeforeUpdateOne)(hooks_1.UpdatedByHook),
    (0, query_graphql_1.BeforeUpdateMany)(hooks_1.UpdatedByHook)
], TodoItemUpdateDTO);
exports.TodoItemUpdateDTO = TodoItemUpdateDTO;
//# sourceMappingURL=todo-item-update.dto.js.map