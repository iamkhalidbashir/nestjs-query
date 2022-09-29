"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntity = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const tag_entity_1 = require("../tag/tag.entity");
let TodoItemEntity = class TodoItemEntity {
};
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ default: Date.now }),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ default: Date.now }),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ ref: () => tag_entity_1.TagEntity }),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "tags", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "updatedBy", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({
        ref: 'SubTaskEntity',
        localField: '_id',
        foreignField: 'todoItem',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "subTasks", void 0);
TodoItemEntity = (0, tslib_1.__decorate)([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            collection: 'todo-items',
            toObject: { virtuals: true },
        },
    })
], TodoItemEntity);
exports.TodoItemEntity = TodoItemEntity;
//# sourceMappingURL=todo-item.entity.js.map