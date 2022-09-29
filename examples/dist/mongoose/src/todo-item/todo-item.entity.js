"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemEntitySchema = exports.TodoItemEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TodoItemEntity = class TodoItemEntity extends mongoose_2.Document {
};
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TodoItemEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ default: Date.now }),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ default: Date.now }),
    (0, tslib_1.__metadata)("design:type", Date)
], TodoItemEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)([{ type: mongoose_2.SchemaTypes.ObjectId, ref: 'TagEntity' }]),
    (0, tslib_1.__metadata)("design:type", Array)
], TodoItemEntity.prototype, "tags", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], TodoItemEntity.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TodoItemEntity.prototype, "updatedBy", void 0);
TodoItemEntity = (0, tslib_1.__decorate)([
    (0, mongoose_1.Schema)({ timestamps: true })
], TodoItemEntity);
exports.TodoItemEntity = TodoItemEntity;
exports.TodoItemEntitySchema = mongoose_1.SchemaFactory.createForClass(TodoItemEntity);
exports.TodoItemEntitySchema.virtual('subTasks', {
    ref: 'SubTaskEntity',
    localField: '_id',
    foreignField: 'todoItem',
});
//# sourceMappingURL=todo-item.entity.js.map