"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestReference = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const test_entity_1 = require("./test.entity");
class TestReference {
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TestReference.prototype, "referenceName", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: () => test_entity_1.TestEntity, required: false }),
    (0, tslib_1.__metadata)("design:type", Object)
], TestReference.prototype, "testEntity", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({
        ref: 'TestEntity',
        localField: 'testEntity',
        foreignField: '_id',
        justOne: true,
    }),
    (0, tslib_1.__metadata)("design:type", Object)
], TestReference.prototype, "virtualTestEntity", void 0);
exports.TestReference = TestReference;
//# sourceMappingURL=test-reference.entity.js.map