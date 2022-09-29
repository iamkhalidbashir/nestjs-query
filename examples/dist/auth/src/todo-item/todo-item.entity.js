"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const sub_task_entity_1 = require("../sub-task/sub-task.entity");
const tag_entity_1 = require("../tag/tag.entity");
const user_entity_1 = require("../user/user.entity");
let TodoItemEntity = class TodoItemEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "ownerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (u) => u.todoItems, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, tslib_1.__metadata)("design:type", user_entity_1.UserEntity)
], TodoItemEntity.prototype, "owner", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => sub_task_entity_1.SubTaskEntity, (subTask) => subTask.todoItem),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "subTasks", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.TagEntity, (tag) => tag.todoItems),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "tags", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false, default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "updatedBy", void 0);
TodoItemEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'todo_item' })
], TodoItemEntity);
exports.TodoItemEntity = TodoItemEntity;
//# sourceMappingURL=todo-item.entity.js.map