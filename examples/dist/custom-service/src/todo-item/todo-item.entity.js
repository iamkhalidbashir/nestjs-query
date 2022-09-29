"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
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
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "updated", void 0);
TodoItemEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'todo_item' })
], TodoItemEntity);
exports.TodoItemEntity = TodoItemEntity;
//# sourceMappingURL=todo-item.entity.js.map