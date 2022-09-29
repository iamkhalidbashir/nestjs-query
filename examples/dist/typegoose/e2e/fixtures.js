"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = exports.SUB_TASKS = exports.TODO_ITEMS = exports.TAGS = void 0;
/* eslint-disable no-underscore-dangle,@typescript-eslint/no-unsafe-assignment */
const mongoose_1 = require("mongoose");
const helpers_1 = require("../../helpers");
const { ObjectId } = mongoose_1.Types;
exports.TAGS = [
    { id: '5f74ed2686b2bae7bf4b4aab', name: 'Urgent' },
    { id: '5f74ed2686b2bae7bf4b4aac', name: 'Home' },
    { id: '5f74ed2686b2bae7bf4b4aad', name: 'Work' },
    { id: '5f74ed2686b2bae7bf4b4aae', name: 'Question' },
    { id: '5f74ed2686b2bae7bf4b4aaf', name: 'Blocked' },
];
exports.TODO_ITEMS = [
    {
        id: '5f74af112fae2b251510e3ad',
        title: 'Create Nest App',
        completed: true,
        priority: 0,
        tags: [exports.TAGS[0].id, exports.TAGS[1].id],
    },
    {
        id: '5f74af112fae2b251510e3ae',
        title: 'Create Entity',
        completed: false,
        priority: 1,
        tags: [exports.TAGS[0].id, exports.TAGS[2].id],
    },
    {
        id: '5f74af112fae2b251510e3af',
        title: 'Create Entity Service',
        completed: false,
        priority: 2,
        tags: [exports.TAGS[4].id, exports.TAGS[2].id],
    },
    {
        id: '5f74af112fae2b251510e3b0',
        title: 'Add Todo Item Resolver',
        completed: false,
        priority: 3,
        tags: [exports.TAGS[4].id, exports.TAGS[1].id],
    },
    {
        id: '5f74af112fae2b251510e3b1',
        title: 'How to create item With Sub Tasks',
        completed: false,
        priority: 4,
        tags: [exports.TAGS[3].id, exports.TAGS[4].id],
    },
];
exports.SUB_TASKS = [
    {
        id: '5f74ed936c3afaeaadb8f31a',
        completed: true,
        description: null,
        title: `${exports.TODO_ITEMS[0].title} - Sub Task 1`,
        todoItem: exports.TODO_ITEMS[0].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f31b',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[0].title} - Sub Task 2`,
        todoItem: exports.TODO_ITEMS[0].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f31c',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[0].title} - Sub Task 3`,
        todoItem: exports.TODO_ITEMS[0].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f31d',
        completed: true,
        description: null,
        title: `${exports.TODO_ITEMS[1].title} - Sub Task 1`,
        todoItem: exports.TODO_ITEMS[1].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f31e',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[1].title} - Sub Task 2`,
        todoItem: exports.TODO_ITEMS[1].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f31f',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[1].title} - Sub Task 3`,
        todoItem: exports.TODO_ITEMS[1].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f320',
        completed: true,
        description: null,
        title: `${exports.TODO_ITEMS[2].title} - Sub Task 1`,
        todoItem: exports.TODO_ITEMS[2].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f321',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[2].title} - Sub Task 2`,
        todoItem: exports.TODO_ITEMS[2].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f322',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[2].title} - Sub Task 3`,
        todoItem: exports.TODO_ITEMS[2].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f323',
        completed: true,
        description: null,
        title: `${exports.TODO_ITEMS[3].title} - Sub Task 1`,
        todoItem: exports.TODO_ITEMS[3].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f324',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[3].title} - Sub Task 2`,
        todoItem: exports.TODO_ITEMS[3].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f325',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[3].title} - Sub Task 3`,
        todoItem: exports.TODO_ITEMS[3].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f326',
        completed: true,
        description: null,
        title: `${exports.TODO_ITEMS[4].title} - Sub Task 1`,
        todoItem: exports.TODO_ITEMS[4].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f327',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[4].title} - Sub Task 2`,
        todoItem: exports.TODO_ITEMS[4].id,
    },
    {
        id: '5f74ed936c3afaeaadb8f328',
        completed: false,
        description: null,
        title: `${exports.TODO_ITEMS[4].title} - Sub Task 3`,
        todoItem: exports.TODO_ITEMS[4].id,
    },
];
const documents = ['TodoItemEntity', 'SubTaskEntity', 'TagEntity'];
const truncate = async (connection) => (0, helpers_1.asyncLoop)(documents, (document) => connection.model(document).deleteMany({}).exec());
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const TodoModel = connection.model('TodoItemEntity');
    const TagsModel = connection.model('TagEntity');
    const SubTaskModel = connection.model('SubTaskEntity');
    await Promise.all(exports.TODO_ITEMS.map(({ id, ...rest }) => new TodoModel({ _id: new ObjectId(id), ...rest }).save()));
    await Promise.all(exports.SUB_TASKS.map(({ id, ...rest }) => new SubTaskModel({ _id: new ObjectId(id), ...rest }).save()));
    await Promise.all(exports.TAGS.map(({ id, ...rest }) => new TagsModel({ _id: new ObjectId(id), ...rest }).save()));
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map