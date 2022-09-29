"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const sub_task_entity_1 = require("../src/sub-task/sub-task.entity");
const tag_entity_1 = require("../src/tag/tag.entity");
const todo_item_entity_1 = require("../src/todo-item/todo-item.entity");
const helpers_1 = require("../../helpers");
const user_entity_1 = require("../src/user/user.entity");
const tables = ['todo_item', 'sub_task', 'tag', 'user'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const userRepo = connection.getRepository(user_entity_1.UserEntity);
    const todoRepo = connection.getRepository(todo_item_entity_1.TodoItemEntity);
    const subTaskRepo = connection.getRepository(sub_task_entity_1.SubTaskEntity);
    const tagsRepo = connection.getRepository(tag_entity_1.TagEntity);
    const users = await userRepo.save([
        { username: 'nestjs-query', password: '123' },
        { username: 'nestjs-query-2', password: '123' },
        { username: 'nestjs-query-3', password: '123' },
    ]);
    const urgentTag = await tagsRepo.save({ name: 'Urgent' });
    const homeTag = await tagsRepo.save({ name: 'Home' });
    const workTag = await tagsRepo.save({ name: 'Work' });
    const questionTag = await tagsRepo.save({ name: 'Question' });
    const blockedTag = await tagsRepo.save({ name: 'Blocked' });
    const todoItems = await users.reduce(async (prev, user) => {
        const allTodos = await prev;
        const userTodos = await todoRepo.save([
            { title: 'Create Nest App', completed: true, priority: 0, tags: [urgentTag, homeTag], owner: user },
            { title: 'Create Entity', completed: false, priority: 1, tags: [urgentTag, workTag], owner: user },
            { title: 'Create Entity Service', completed: false, priority: 2, tags: [blockedTag, workTag], owner: user },
            { title: 'Add Todo Item Resolver', completed: false, priority: 3, tags: [blockedTag, homeTag], owner: user },
            {
                title: 'How to create item With Sub Tasks',
                completed: false,
                priority: 4,
                tags: [questionTag, blockedTag],
                owner: user,
            },
        ]);
        return [...allTodos, ...userTodos];
    }, Promise.resolve([]));
    await subTaskRepo.save(todoItems.reduce((subTasks, todo) => [
        ...subTasks,
        { completed: true, title: `${todo.title} - Sub Task 1`, todoItem: todo, ownerId: todo.ownerId },
        { completed: false, title: `${todo.title} - Sub Task 2`, todoItem: todo, ownerId: todo.ownerId },
        { completed: false, title: `${todo.title} - Sub Task 3`, todoItem: todo, ownerId: todo.ownerId },
    ], []));
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map