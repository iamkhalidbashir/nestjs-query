"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkTodoItemsAsCompletedArgs = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_update_dto_1 = require("./dto/todo-item-update.dto");
let MarkTodoItemAsCompleted = class MarkTodoItemAsCompleted extends (0, graphql_1.OmitType)(todo_item_update_dto_1.TodoItemUpdateDTO, ['completed']) {
};
MarkTodoItemAsCompleted = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], MarkTodoItemAsCompleted);
let MarkTodoItemsAsCompletedInput = class MarkTodoItemsAsCompletedInput extends (0, query_graphql_1.UpdateManyInputType)(todo_item_dto_1.TodoItemDTO, MarkTodoItemAsCompleted) {
};
MarkTodoItemsAsCompletedInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], MarkTodoItemsAsCompletedInput);
let MarkTodoItemsAsCompletedArgs = class MarkTodoItemsAsCompletedArgs extends (0, query_graphql_1.MutationArgsType)(MarkTodoItemsAsCompletedInput) {
};
MarkTodoItemsAsCompletedArgs = (0, tslib_1.__decorate)([
    (0, graphql_1.ArgsType)()
], MarkTodoItemsAsCompletedArgs);
exports.MarkTodoItemsAsCompletedArgs = MarkTodoItemsAsCompletedArgs;
//# sourceMappingURL=types.js.map