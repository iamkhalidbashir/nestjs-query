"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const sub_task_entity_1 = require("../src/sub-task/sub-task.entity");
const tag_entity_1 = require("../src/tag/tag.entity");
const todo_item_entity_1 = require("../src/todo-item/todo-item.entity");
const helpers_1 = require("../../helpers");
const tables = ['todo_item', 'sub_task', 'tag'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const todoRepo = connection.getRepository(todo_item_entity_1.TodoItemEntity);
    const subTaskRepo = connection.getRepository(sub_task_entity_1.SubTaskEntity);
    const tagsRepo = connection.getRepository(tag_entity_1.TagEntity);
    const urgentTag = await tagsRepo.save({ name: 'Urgent' });
    const homeTag = await tagsRepo.save({ name: 'Home' });
    const workTag = await tagsRepo.save({ name: 'Work' });
    const questionTag = await tagsRepo.save({ name: 'Question' });
    const blockedTag = await tagsRepo.save({ name: 'Blocked' });
    const todoItems = await todoRepo.save([
        { title: 'Create Nest App', completed: true, priority: 0, tags: [urgentTag, homeTag] },
        { title: 'Create Entity', completed: false, priority: 1, tags: [urgentTag, workTag] },
        { title: 'Create Entity Service', completed: false, priority: 2, tags: [blockedTag, workTag] },
        { title: 'Add Todo Item Resolver', completed: false, priority: 3, tags: [blockedTag, homeTag] },
        {
            title: 'How to create item With Sub Tasks',
            completed: false,
            priority: 4,
            tags: [questionTag, blockedTag],
        },
    ]);
    await subTaskRepo.save(todoItems.reduce((subTasks, todo) => [
        ...subTasks,
        { completed: true, title: `${todo.title} - Sub Task 1`, todoItem: todo },
        { completed: false, title: `${todo.title} - Sub Task 2`, todoItem: todo },
        { completed: false, title: `${todo.title} - Sub Task 3`, todoItem: todo },
    ], []));
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map