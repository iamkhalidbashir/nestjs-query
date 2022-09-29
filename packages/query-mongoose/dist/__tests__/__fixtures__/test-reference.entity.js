"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestReferenceSchema = exports.TestReference = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TestReference = class TestReference extends mongoose_2.Document {
};
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TestReference.prototype, "referenceName", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: 'TestEntity' }),
    (0, tslib_1.__metadata)("design:type", mongoose_2.Types.ObjectId)
], TestReference.prototype, "testEntity", void 0);
TestReference = (0, tslib_1.__decorate)([
    (0, mongoose_1.Schema)()
], TestReference);
exports.TestReference = TestReference;
exports.TestReferenceSchema = mongoose_1.SchemaFactory.createForClass(TestReference);
exports.TestReferenceSchema.virtual('virtualTestEntity', {
    ref: 'TestEntity',
    localField: 'testEntity',
    foreignField: '_id',
    justOne: true,
});
//# sourceMappingURL=test-reference.entity.js.map