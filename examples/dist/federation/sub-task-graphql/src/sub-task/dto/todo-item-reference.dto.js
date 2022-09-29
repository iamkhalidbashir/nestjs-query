"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemReferenceDTO = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const sub_task_dto_1 = require("./sub-task.dto");
let TodoItemReferenceDTO = class TodoItemReferenceDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, graphql_1.Directive)('@external'),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemReferenceDTO.prototype, "id", void 0);
TodoItemReferenceDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('TodoItem'),
    (0, graphql_1.Directive)('@extends'),
    (0, graphql_1.Directive)('@key(fields: "id")'),
    (0, query_graphql_1.CursorConnection)('subTasks', () => sub_task_dto_1.SubTaskDTO)
], TodoItemReferenceDTO);
exports.TodoItemReferenceDTO = TodoItemReferenceDTO;
//# sourceMappingURL=todo-item-reference.dto.js.map