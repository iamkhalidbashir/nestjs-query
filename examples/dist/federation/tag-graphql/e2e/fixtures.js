"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const tag_todo_item_entity_1 = require("../src/tag/tag-todo-item.entity");
const tag_entity_1 = require("../src/tag/tag.entity");
const helpers_1 = require("../../../helpers");
const tables = ['tag_todo_item', 'tag'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const tagsRepo = connection.getRepository(tag_entity_1.TagEntity);
    const tagTodoItemRepo = connection.getRepository(tag_todo_item_entity_1.TagTodoItemEntity);
    const urgentTag = await tagsRepo.save({ name: 'Urgent' });
    const homeTag = await tagsRepo.save({ name: 'Home' });
    const workTag = await tagsRepo.save({ name: 'Work' });
    const questionTag = await tagsRepo.save({ name: 'Question' });
    const blockedTag = await tagsRepo.save({ name: 'Blocked' });
    await tagTodoItemRepo.save([
        { tag: urgentTag, todoItemId: 1 },
        { tag: urgentTag, todoItemId: 2 },
        { tag: homeTag, todoItemId: 1 },
        { tag: homeTag, todoItemId: 4 },
        { tag: workTag, todoItemId: 2 },
        { tag: workTag, todoItemId: 3 },
        { tag: questionTag, todoItemId: 5 },
        { tag: blockedTag, todoItemId: 3 },
        { tag: blockedTag, todoItemId: 4 },
        { tag: blockedTag, todoItemId: 5 },
    ]);
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map