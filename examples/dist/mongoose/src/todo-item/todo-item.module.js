"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const common_1 = require("@nestjs/common");
const query_mongoose_1 = require("@nestjs-query/query-mongoose");
const auth_guard_1 = require("../auth.guard");
const todo_item_input_dto_1 = require("./dto/todo-item-input.dto");
const todo_item_update_dto_1 = require("./dto/todo-item-update.dto");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_assembler_1 = require("./todo-item.assembler");
const todo_item_entity_1 = require("./todo-item.entity");
const todo_item_resolver_1 = require("./todo-item.resolver");
const guards = [auth_guard_1.AuthGuard];
let TodoItemModule = class TodoItemModule {
};
TodoItemModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [todo_item_resolver_1.TodoItemResolver],
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    query_mongoose_1.NestjsQueryMongooseModule.forFeature([
                        { document: todo_item_entity_1.TodoItemEntity, name: todo_item_entity_1.TodoItemEntity.name, schema: todo_item_entity_1.TodoItemEntitySchema },
                    ]),
                ],
                assemblers: [todo_item_assembler_1.TodoItemAssembler],
                resolvers: [
                    {
                        DTOClass: todo_item_dto_1.TodoItemDTO,
                        AssemblerClass: todo_item_assembler_1.TodoItemAssembler,
                        CreateDTOClass: todo_item_input_dto_1.TodoItemInputDTO,
                        UpdateDTOClass: todo_item_update_dto_1.TodoItemUpdateDTO,
                        enableAggregate: true,
                        aggregate: { guards },
                        create: { guards },
                        update: { guards },
                        delete: { guards },
                    },
                ],
            }),
        ],
    })
], TodoItemModule);
exports.TodoItemModule = TodoItemModule;
//# sourceMappingURL=todo-item.module.js.map