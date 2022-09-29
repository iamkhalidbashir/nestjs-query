"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const todo_item_tag_entity_1 = require("../todo-item/entity/todo-item-tag.entity");
const todo_item_entity_1 = require("../todo-item/entity/todo-item.entity");
let TagEntity = class TagEntity extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Number)
], TagEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.CreatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.UpdatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsToMany)(() => todo_item_entity_1.TodoItemEntity, () => todo_item_tag_entity_1.TodoItemEntityTags),
    (0, tslib_1.__metadata)("design:type", Array)
], TagEntity.prototype, "todoItems", void 0);
TagEntity = (0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Table)({})
], TagEntity);
exports.TagEntity = TagEntity;
//# sourceMappingURL=tag.entity.js.map