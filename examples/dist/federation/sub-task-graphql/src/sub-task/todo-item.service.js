"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const todo_item_reference_dto_1 = require("./dto/todo-item-reference.dto");
const sub_task_entity_1 = require("./sub-task.entity");
let TodoItemService = class TodoItemService extends core_1.RelationQueryService {
    constructor(subTaskService) {
        super({
            // the name of the relation
            subTasks: {
                // the service to delegate to when looking up the relations
                service: subTaskService,
                // a query factory that will take in the reference to create a query.
                query: (todoItemReferenceDTO) => ({ filter: { todoItemId: { eq: todoItemReferenceDTO.id } } }),
            },
        });
        this.subTaskService = subTaskService;
    }
};
TodoItemService = (0, tslib_1.__decorate)([
    (0, core_1.QueryService)(todo_item_reference_dto_1.TodoItemReferenceDTO),
    (0, tslib_1.__param)(0, (0, core_1.InjectQueryService)(sub_task_entity_1.SubTaskEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemService);
exports.TodoItemService = TodoItemService;
//# sourceMappingURL=todo-item.service.js.map