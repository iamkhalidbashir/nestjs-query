"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemResolver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_entity_1 = require("./todo-item.entity");
const types_1 = require("./types");
const auth_guard_1 = require("../auth/auth.guard");
const todo_item_update_dto_1 = require("./dto/todo-item-update.dto");
let TodoItemResolver = class TodoItemResolver {
    constructor(service) {
        this.service = service;
    }
    // Set the return type to the TodoItemConnection
    markTodoItemsAsCompleted({ input }) {
        return this.service.updateMany({ ...input.update, completed: true }, (0, core_1.mergeFilter)(input.filter, { completed: { is: false } }));
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => (0, query_graphql_1.UpdateManyResponseType)()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, query_graphql_1.HookInterceptor)(query_graphql_1.HookTypes.BEFORE_UPDATE_MANY, todo_item_update_dto_1.TodoItemUpdateDTO)),
    (0, tslib_1.__param)(0, (0, query_graphql_1.MutationHookArgs)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.MarkTodoItemsAsCompletedArgs]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "markTodoItemsAsCompleted", null);
TodoItemResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => todo_item_dto_1.TodoItemDTO),
    (0, tslib_1.__param)(0, (0, core_1.InjectQueryService)(todo_item_entity_1.TodoItemEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemResolver);
exports.TodoItemResolver = TodoItemResolver;
//# sourceMappingURL=todo-item.resolver.js.map