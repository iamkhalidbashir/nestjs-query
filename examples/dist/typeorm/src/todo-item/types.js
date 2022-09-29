"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemConnection = exports.TodoItemQuery = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("./dto/todo-item.dto");
let TodoItemQuery = class TodoItemQuery extends (0, query_graphql_1.QueryArgsType)(todo_item_dto_1.TodoItemDTO) {
};
TodoItemQuery = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], TodoItemQuery);
exports.TodoItemQuery = TodoItemQuery;
exports.TodoItemConnection = TodoItemQuery.ConnectionType;
//# sourceMappingURL=types.js.map