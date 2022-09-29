"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const tslib_1 = require("tslib");
const sub_task_entity_1 = require("../../src/sub-task/sub-task.entity");
const helpers_1 = require("../../../../helpers");
const tables = ['sub_task'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const todoItems = [
        { id: 1, title: 'Create Nest App' },
        { id: 2, title: 'Create Entity' },
        { id: 3, title: 'Create Entity Service' },
        { id: 4, title: 'Add Todo Item Resolver' },
        { id: 5, title: 'How to create item With Sub Tasks' },
    ];
    const subTaskRepo = connection.getRepository(sub_task_entity_1.SubTaskEntity);
    await subTaskRepo.save(todoItems.reduce((subTasks, todo) => [
        ...subTasks,
        { completed: true, title: `${todo.title} - Sub Task 1`, todoItemId: todo.id },
        { completed: false, title: `${todo.title} - Sub Task 2`, todoItemId: todo.id },
        { completed: false, title: `${todo.title} - Sub Task 3`, todoItemId: todo.id },
    ], []));
};
exports.refresh = refresh;
(0, tslib_1.__exportStar)(require("./graphql-fragments"), exports);
//# sourceMappingURL=index.js.map