"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntity = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const sub_task_entity_1 = require("../../sub-task/sub-task.entity");
const tag_entity_1 = require("../../tag/tag.entity");
const todo_item_tag_entity_1 = require("./todo-item-tag.entity");
let TodoItemEntity = class TodoItemEntity extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.HasMany)(() => sub_task_entity_1.SubTaskEntity),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "subTasks", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.CreatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.UpdatedAt,
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_entity_1.TagEntity, 
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    () => todo_item_tag_entity_1.TodoItemEntityTags),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "tags", void 0);
(0, tslib_1.__decorate)([
    sequelize_typescript_1.AllowNull,
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "priority", void 0);
TodoItemEntity = (0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Table)({})
], TodoItemEntity);
exports.TodoItemEntity = TodoItemEntity;
//# sourceMappingURL=todo-item.entity.js.map