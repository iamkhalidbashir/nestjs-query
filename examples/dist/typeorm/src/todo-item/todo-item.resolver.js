"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemResolver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_assembler_1 = require("./todo-item.assembler");
const types_1 = require("./types");
let TodoItemResolver = class TodoItemResolver {
    constructor(service) {
        this.service = service;
    }
    // Set the return type to the TodoItemConnection
    completedTodoItems(query) {
        // add the completed filter the user provided filter
        const filter = {
            ...query.filter,
            ...{ completed: { is: true } },
        };
        return types_1.TodoItemConnection.createFromPromise((q) => this.service.query(q), { ...query, ...{ filter } });
    }
    // Set the return type to the TodoItemConnection
    uncompletedTodoItems(query) {
        // add the completed filter the user provided filter
        const filter = {
            ...query.filter,
            ...{ completed: { is: false } },
        };
        return types_1.TodoItemConnection.createFromPromise((q) => this.service.query(q), { ...query, ...{ filter } });
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.TodoItemConnection),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.TodoItemQuery]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "completedTodoItems", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.TodoItemConnection),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.TodoItemQuery]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "uncompletedTodoItems", null);
TodoItemResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => todo_item_dto_1.TodoItemDTO),
    (0, tslib_1.__param)(0, (0, core_1.InjectAssemblerQueryService)(todo_item_assembler_1.TodoItemAssembler)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemResolver);
exports.TodoItemResolver = TodoItemResolver;
//# sourceMappingURL=todo-item.resolver.js.map