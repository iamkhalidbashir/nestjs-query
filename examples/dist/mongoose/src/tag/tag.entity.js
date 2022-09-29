"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntitySchema = exports.TagEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TagEntity = class TagEntity extends mongoose_2.Document {
};
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "updatedBy", void 0);
TagEntity = (0, tslib_1.__decorate)([
    (0, mongoose_1.Schema)({ timestamps: true })
], TagEntity);
exports.TagEntity = TagEntity;
exports.TagEntitySchema = mongoose_1.SchemaFactory.createForClass(TagEntity);
exports.TagEntitySchema.virtual('todoItems', {
    ref: 'TodoItemEntity',
    localField: '_id',
    foreignField: 'tags',
});
//# sourceMappingURL=tag.entity.js.map