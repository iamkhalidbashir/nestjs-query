"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const todo_item_entity_1 = require("../todo-item/todo-item.entity");
let UserEntity = class UserEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], UserEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], UserEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => todo_item_entity_1.TodoItemEntity, (todo) => todo.owner),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], UserEntity.prototype, "todoItems", void 0);
UserEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'user' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map