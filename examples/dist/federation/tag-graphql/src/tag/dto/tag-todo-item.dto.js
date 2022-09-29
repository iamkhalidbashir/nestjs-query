"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagTodoItemDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const tag_dto_1 = require("./tag.dto");
const todo_item_reference_dto_1 = require("./todo-item-reference.dto");
let TagTodoItemDTO = class TagTodoItemDTO {
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemDTO.prototype, "tagId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemDTO.prototype, "todoItemId", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TagTodoItemDTO.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TagTodoItemDTO.prototype, "updated", void 0);
TagTodoItemDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('TagTodoItem'),
    (0, query_graphql_1.Relation)('tag', () => tag_dto_1.TagDTO),
    (0, query_graphql_1.Reference)('todoItem', () => todo_item_reference_dto_1.TodoItemReferenceDTO, { id: 'todoItemId' })
], TagTodoItemDTO);
exports.TagTodoItemDTO = TagTodoItemDTO;
//# sourceMappingURL=tag-todo-item.dto.js.map