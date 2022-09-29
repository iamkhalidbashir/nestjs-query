"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const helpers_1 = require("../../helpers");
const todo_item_entity_1 = require("../src/todo-item/todo-item.entity");
const tables = ['todo_item'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const todoRepo = connection.getRepository(todo_item_entity_1.TodoItemEntity);
    await todoRepo.save([
        { title: 'Create Nest App', completed: true },
        { title: 'Create Entity', completed: false },
        { title: 'Create Entity Service', completed: false },
        { title: 'Add Todo Item Resolver', completed: false },
        {
            title: 'How to create item With Sub Tasks',
            completed: false,
        },
    ]);
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map