"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
let TagEntity = class TagEntity {
};
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "updatedBy", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.Prop)({
        ref: 'TodoItemEntity',
        localField: '_id',
        foreignField: 'tags',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], TagEntity.prototype, "todoItems", void 0);
TagEntity = (0, tslib_1.__decorate)([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            collection: 'tags',
            toObject: { virtuals: true },
        },
    })
], TagEntity);
exports.TagEntity = TagEntity;
//# sourceMappingURL=tag.entity.js.map