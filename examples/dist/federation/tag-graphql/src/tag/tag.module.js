"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const common_1 = require("@nestjs/common");
const tag_input_dto_1 = require("./dto/tag-input.dto");
const tag_todo_item_dto_1 = require("./dto/tag-todo-item.dto");
const tag_todo_item_input_1 = require("./dto/tag-todo-item.input");
const tag_dto_1 = require("./dto/tag.dto");
const todo_item_reference_dto_1 = require("./dto/todo-item-reference.dto");
const tag_todo_item_entity_1 = require("./tag-todo-item.entity");
const tag_entity_1 = require("./tag.entity");
const todo_item_service_1 = require("./todo-item.service");
let TagModule = class TagModule {
};
TagModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([tag_entity_1.TagEntity, tag_todo_item_entity_1.TagTodoItemEntity])],
                services: [todo_item_service_1.TodoItemService],
                resolvers: [
                    {
                        DTOClass: tag_dto_1.TagDTO,
                        EntityClass: tag_entity_1.TagEntity,
                        CreateDTOClass: tag_input_dto_1.TagInputDTO,
                        UpdateDTOClass: tag_input_dto_1.TagInputDTO,
                    },
                    {
                        DTOClass: tag_todo_item_dto_1.TagTodoItemDTO,
                        EntityClass: tag_todo_item_entity_1.TagTodoItemEntity,
                        CreateDTOClass: tag_todo_item_input_1.TagTodoItemInputDTO,
                        UpdateDTOClass: tag_todo_item_input_1.TagTodoItemInputDTO,
                    },
                    {
                        type: 'federated',
                        DTOClass: todo_item_reference_dto_1.TodoItemReferenceDTO,
                        Service: todo_item_service_1.TodoItemService,
                    },
                ],
            }),
        ],
    })
], TagModule);
exports.TagModule = TagModule;
//# sourceMappingURL=tag.module.js.map