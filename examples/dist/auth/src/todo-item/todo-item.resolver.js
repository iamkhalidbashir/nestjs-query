"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemResolver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_assembler_1 = require("./todo-item.assembler");
const types_1 = require("./types");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TodoItemResolver = class TodoItemResolver {
    constructor(service) {
        this.service = service;
    }
    // Set the return type to the TodoItemConnection
    async completedTodoItems(query, authFilter) {
        var _a;
        // add the completed filter the user provided filter
        const filter = (0, core_1.mergeFilter)((_a = query.filter) !== null && _a !== void 0 ? _a : {}, { completed: { is: true } });
        const completedQuery = (0, core_1.mergeQuery)(query, { filter: (0, core_1.mergeFilter)(filter, authFilter) });
        return types_1.TodoItemConnection.createFromPromise((q) => this.service.query(q), completedQuery, (q) => this.service.count(q));
    }
    // Set the return type to the TodoItemConnection
    async uncompletedTodoItems(query, authFilter) {
        var _a;
        // add the completed filter the user provided filter
        const filter = (0, core_1.mergeFilter)((_a = query.filter) !== null && _a !== void 0 ? _a : {}, { completed: { is: false } });
        const uncompletedQuery = (0, core_1.mergeQuery)(query, { filter: (0, core_1.mergeFilter)(filter, authFilter) });
        return types_1.TodoItemConnection.createFromPromise((q) => this.service.query(q), uncompletedQuery, (q) => this.service.count(q));
    }
    async failingTodoItems(query, authFilter) {
        var _a;
        // add the completed filter the user provided filter
        const filter = (0, core_1.mergeFilter)((_a = query.filter) !== null && _a !== void 0 ? _a : {}, { completed: { is: false } });
        const uncompletedQuery = (0, core_1.mergeQuery)(query, { filter: (0, core_1.mergeFilter)(filter, authFilter) });
        return types_1.TodoItemConnection.createFromPromise((q) => this.service.query(q), uncompletedQuery, (q) => this.service.count(q));
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.TodoItemConnection),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__param)(1, (0, query_graphql_1.AuthorizerFilter)({
        operationGroup: query_graphql_1.OperationGroup.READ,
        many: true,
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.TodoItemQuery, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "completedTodoItems", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.TodoItemConnection),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__param)(1, (0, query_graphql_1.AuthorizerFilter)({
        operationName: 'queryUncompletedTodoItems',
        operationGroup: query_graphql_1.OperationGroup.READ,
        readonly: true,
        many: true,
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.TodoItemQuery, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "uncompletedTodoItems", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.TodoItemConnection),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
    (0, tslib_1.__param)(1, (0, query_graphql_1.AuthorizerFilter)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [types_1.TodoItemQuery, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TodoItemResolver.prototype, "failingTodoItems", null);
TodoItemResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => todo_item_dto_1.TodoItemDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, query_graphql_1.AuthorizerInterceptor)(todo_item_dto_1.TodoItemDTO)),
    (0, tslib_1.__param)(0, (0, core_1.InjectAssemblerQueryService)(todo_item_assembler_1.TodoItemAssembler)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemResolver);
exports.TodoItemResolver = TodoItemResolver;
//# sourceMappingURL=todo-item.resolver.js.map