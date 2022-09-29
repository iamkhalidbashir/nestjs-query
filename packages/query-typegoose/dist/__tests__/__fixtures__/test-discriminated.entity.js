"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDiscriminatedEntity = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const test_entity_1 = require("./test.entity");
class TestDiscriminatedEntity extends test_entity_1.TestEntity {
}
(0, tslib_1.__decorate)([
    (0, typegoose_1.prop)({ required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], TestDiscriminatedEntity.prototype, "stringType2", void 0);
exports.TestDiscriminatedEntity = TestDiscriminatedEntity;
//# sourceMappingURL=test-discriminated.entity.js.map