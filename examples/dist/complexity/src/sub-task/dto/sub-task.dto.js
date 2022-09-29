"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskDTO = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("../../todo-item/dto/todo-item.dto");
let SubTaskDTO = class SubTaskDTO {
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID, { complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", Number)
], SubTaskDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ nullable: true, complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskDTO.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskDTO.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime, { complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskDTO.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime, { complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskDTO.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ complexity: 1 }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskDTO.prototype, "todoItemId", void 0);
SubTaskDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('SubTask'),
    (0, query_graphql_1.QueryOptions)({ enableTotalCount: true }),
    (0, query_graphql_1.Relation)('todoItem', () => todo_item_dto_1.TodoItemDTO, { disableRemove: true, complexity: 5 })
], SubTaskDTO);
exports.SubTaskDTO = SubTaskDTO;
//# sourceMappingURL=sub-task.dto.js.map