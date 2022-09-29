"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const todo_item_entity_1 = require("../src/todo-item/todo-item.entity");
const helpers_1 = require("../../../helpers");
const tables = ['todo_item'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const todoRepo = connection.getRepository(todo_item_entity_1.TodoItemEntity);
    await todoRepo.save([
        { title: 'Create Nest App', completed: true, assigneeId: 1 },
        { title: 'Create Entity', completed: false, assigneeId: 2 },
        { title: 'Create Entity Service', completed: false, assigneeId: 3 },
        { title: 'Add Todo Item Resolver', completed: false },
        { title: 'How to create item With Sub Tasks', completed: false },
    ]);
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map