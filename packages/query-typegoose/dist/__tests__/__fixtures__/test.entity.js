"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const test_reference_entity_1 = require("./test-reference.entity");
class TestEntity {
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TestEntity.prototype, "stringType", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TestEntity.prototype, "boolType", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], TestEntity.prototype, "numberType", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", Date)
], TestEntity.prototype, "dateType", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: test_reference_entity_1.TestReference, required: false }),
    (0, tslib_1.__metadata)("design:type", Object)
], TestEntity.prototype, "testReference", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ ref: test_reference_entity_1.TestReference, required: false }),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "testReferences", void 0);
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({
        ref: 'TestReference',
        localField: '_id',
        foreignField: 'testEntity',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "virtualTestReferences", void 0);
exports.TestEntity = TestEntity;
//# sourceMappingURL=test.entity.js.map