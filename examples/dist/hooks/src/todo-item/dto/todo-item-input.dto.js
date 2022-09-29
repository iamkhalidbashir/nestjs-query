"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemInputDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const hooks_1 = require("../../hooks");
let TodoItemInputDTO = class TodoItemInputDTO {
};
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemInputDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemInputDTO.prototype, "completed", void 0);
TodoItemInputDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('TodoItemInput'),
    (0, query_graphql_1.BeforeCreateOne)(hooks_1.CreatedByHook),
    (0, query_graphql_1.BeforeCreateMany)(hooks_1.CreatedByHook)
], TodoItemInputDTO);
exports.TodoItemInputDTO = TodoItemInputDTO;
//# sourceMappingURL=todo-item-input.dto.js.map