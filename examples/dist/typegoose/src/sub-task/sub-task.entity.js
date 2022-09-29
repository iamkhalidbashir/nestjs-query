"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskEntity = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const todo_item_entity_1 = require("../todo-item/todo-item.entity");
let SubTaskEntity = class SubTaskEntity {
};
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ ref: () => todo_item_entity_1.TodoItemEntity, required: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], SubTaskEntity.prototype, "todoItem", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "updatedBy", void 0);
SubTaskEntity = (0, tslib_1.__decorate)([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            collection: 'sub-tasks',
            toObject: { virtuals: true },
        },
    })
], SubTaskEntity);
exports.SubTaskEntity = SubTaskEntity;
//# sourceMappingURL=sub-task.entity.js.map