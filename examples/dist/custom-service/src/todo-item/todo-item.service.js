"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const todo_item_entity_1 = require("./todo-item.entity");
let TodoItemService = class TodoItemService extends core_1.NoOpQueryService {
    constructor(queryService) {
        super();
        this.queryService = queryService;
    }
    createOne({ name: title, isCompleted: completed }) {
        return this.queryService.createOne({ title, completed });
    }
    createMany(items) {
        const newItems = items.map(({ name: title, isCompleted: completed }) => ({ title, completed }));
        return this.queryService.createMany(newItems);
    }
    query(query) {
        return this.queryService.query(query);
    }
    findById(id) {
        return this.queryService.findById(id);
    }
    getById(id) {
        return this.queryService.getById(id);
    }
    updateMany(update, filter) {
        return this.queryService.updateMany(update, filter);
    }
    updateOne(id, update) {
        return this.queryService.updateOne(id, update);
    }
    deleteMany(filter) {
        return this.queryService.deleteMany(filter);
    }
    deleteOne(id) {
        return this.queryService.deleteOne(id);
    }
};
TodoItemService = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.InjectQueryService)(todo_item_entity_1.TodoItemEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TodoItemService);
exports.TodoItemService = TodoItemService;
//# sourceMappingURL=todo-item.service.js.map