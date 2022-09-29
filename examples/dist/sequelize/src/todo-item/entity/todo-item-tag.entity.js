"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntityTags = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const todo_item_entity_1 = require("./todo-item.entity");
const tag_entity_1 = require("../../tag/tag.entity");
let TodoItemEntityTags = class TodoItemEntityTags extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.ForeignKey)(() => todo_item_entity_1.TodoItemEntity),
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntityTags.prototype, "todoItemId", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.ForeignKey)(() => tag_entity_1.TagEntity),
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntityTags.prototype, "tagId", void 0);
TodoItemEntityTags = (0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Table)({})
], TodoItemEntityTags);
exports.TodoItemEntityTags = TodoItemEntityTags;
//# sourceMappingURL=todo-item-tag.entity.js.map