"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const todo_item_entity_1 = require("../todo-item/todo-item.entity");
const user_entity_1 = require("../user/user.entity");
let SubTaskEntity = class SubTaskEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], SubTaskEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "ownerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (u) => u.todoItems, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, tslib_1.__metadata)("design:type", user_entity_1.UserEntity)
], SubTaskEntity.prototype, "owner", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false, name: 'todo_item_id' }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "todoItemId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => todo_item_entity_1.TodoItemEntity, (td) => td.subTasks, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'todo_item_id' }),
    (0, tslib_1.__metadata)("design:type", todo_item_entity_1.TodoItemEntity)
], SubTaskEntity.prototype, "todoItem", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "updatedBy", void 0);
SubTaskEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'sub_task' })
], SubTaskEntity);
exports.SubTaskEntity = SubTaskEntity;
//# sourceMappingURL=sub-task.entity.js.map