"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemResolver = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_service_1 = require("./todo-item.service");
let TodoItemResolver = class TodoItemResolver {
    constructor(service) {
        this.service = service;
    }
    restoreOneTodoItem(id) {
        return this.service.restoreOne(id);
    }
    restoreManyTodoItems(filter) {
        return this.service.restoreMany(filter);
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => todo_item_dto_1.TodoItemDTO),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => graphql_1.ID })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "restoreOneTodoItem", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => (0, query_graphql_1.UpdateManyResponseType)()),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input', { type: () => (0, query_graphql_1.FilterType)(todo_item_dto_1.TodoItemDTO) })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "restoreManyTodoItems", null);
TodoItemResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => todo_item_dto_1.TodoItemDTO),
    (0, tslib_1.__metadata)("design:paramtypes", [todo_item_service_1.TodoItemService])
], TodoItemResolver);
exports.TodoItemResolver = TodoItemResolver;
//# sourceMappingURL=todo-item.resolver.js.map