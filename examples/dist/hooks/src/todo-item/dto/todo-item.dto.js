"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemDTO = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../../auth/auth.guard");
const sub_task_dto_1 = require("../../sub-task/dto/sub-task.dto");
const tag_dto_1 = require("../../tag/dto/tag.dto");
let TodoItemDTO = class TodoItemDTO {
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemDTO.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemDTO.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemDTO.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemDTO.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemDTO.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemDTO.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemDTO.prototype, "updatedBy", void 0);
TodoItemDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('TodoItem'),
    (0, query_graphql_1.KeySet)(['id']),
    (0, query_graphql_1.FilterableCursorConnection)('subTasks', () => sub_task_dto_1.SubTaskDTO, { disableRemove: true, guards: [auth_guard_1.AuthGuard] }),
    (0, query_graphql_1.FilterableCursorConnection)('tags', () => tag_dto_1.TagDTO, { guards: [auth_guard_1.AuthGuard] })
], TodoItemDTO);
exports.TodoItemDTO = TodoItemDTO;
//# sourceMappingURL=todo-item.dto.js.map