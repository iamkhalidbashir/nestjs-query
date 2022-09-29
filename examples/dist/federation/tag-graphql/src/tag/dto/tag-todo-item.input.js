"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagTodoItemInputDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let TagTodoItemInputDTO = class TagTodoItemInputDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemInputDTO.prototype, "tagId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemInputDTO.prototype, "todoItemId", void 0);
TagTodoItemInputDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('TagTodoItemInput')
], TagTodoItemInputDTO);
exports.TagTodoItemInputDTO = TagTodoItemInputDTO;
//# sourceMappingURL=tag-todo-item.input.js.map