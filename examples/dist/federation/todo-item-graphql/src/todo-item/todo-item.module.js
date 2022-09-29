"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const common_1 = require("@nestjs/common");
const todo_item_input_dto_1 = require("./dto/todo-item-input.dto");
const todo_item_update_dto_1 = require("./dto/todo-item-update.dto");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_entity_1 = require("./todo-item.entity");
let TodoItemModule = class TodoItemModule {
};
TodoItemModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([todo_item_entity_1.TodoItemEntity])],
                resolvers: [
                    {
                        DTOClass: todo_item_dto_1.TodoItemDTO,
                        EntityClass: todo_item_entity_1.TodoItemEntity,
                        CreateDTOClass: todo_item_input_dto_1.TodoItemInputDTO,
                        UpdateDTOClass: todo_item_update_dto_1.TodoItemUpdateDTO,
                        referenceBy: { key: 'id' },
                    },
                ],
            }),
        ],
    })
], TodoItemModule);
exports.TodoItemModule = TodoItemModule;
//# sourceMappingURL=todo-item.module.js.map