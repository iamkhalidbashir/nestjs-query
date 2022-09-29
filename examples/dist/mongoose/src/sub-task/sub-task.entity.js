"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskEntitySchema = exports.SubTaskEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SubTaskEntity = class SubTaskEntity extends mongoose_2.Document {
};
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], SubTaskEntity.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'TodoItemEntity', required: true }),
    (0, tslib_1.__metadata)("design:type", mongoose_2.Types.ObjectId)
], SubTaskEntity.prototype, "todoItem", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], SubTaskEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], SubTaskEntity.prototype, "updatedBy", void 0);
SubTaskEntity = (0, tslib_1.__decorate)([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubTaskEntity);
exports.SubTaskEntity = SubTaskEntity;
exports.SubTaskEntitySchema = mongoose_1.SchemaFactory.createForClass(SubTaskEntity);
//# sourceMappingURL=sub-task.entity.js.map