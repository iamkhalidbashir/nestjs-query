"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const todo_item_reference_dto_1 = require("./dto/todo-item-reference.dto");
const tag_todo_item_entity_1 = require("./tag-todo-item.entity");
let TodoItemService = class TodoItemService extends core_1.RelationQueryService {
    constructor(tagTodoItemService) {
        super({
            tagTodoItems: {
                service: tagTodoItemService,
                query: (ref) => ({ filter: { todoItemId: { eq: ref.id } } }),
            },
        });
        this.tagTodoItemService = tagTodoItemService;
    }
};
TodoItemService = (0, tslib_1.__decorate)([
    (0, core_1.QueryService)(todo_item_reference_dto_1.TodoItemReferenceDTO),
    (0, tslib_1.__param)(0, (0, core_1.InjectQueryService)(tag_todo_item_entity_1.TagTodoItemEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemService);
exports.TodoItemService = TodoItemService;
//# sourceMappingURL=todo-item.service.js.map