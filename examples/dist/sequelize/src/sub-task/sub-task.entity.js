"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskEntity = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const todo_item_entity_1 = require("../todo-item/entity/todo-item.entity");
let SubTaskEntity = class SubTaskEntity extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Number)
], SubTaskEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, sequelize_typescript_1.ForeignKey)(() => todo_item_entity_1.TodoItemEntity),
    (0, tslib_1.__metadata)("design:type", Number)
], SubTaskEntity.prototype, "todoItemId", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsTo)(() => todo_item_entity_1.TodoItemEntity),
    (0, tslib_1.__metadata)("design:type", todo_item_entity_1.TodoItemEntity)
], SubTaskEntity.prototype, "todoItem", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.CreatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.UpdatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "updated", void 0);
SubTaskEntity = (0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Table)({})
], SubTaskEntity);
exports.SubTaskEntity = SubTaskEntity;
//# sourceMappingURL=sub-task.entity.js.map