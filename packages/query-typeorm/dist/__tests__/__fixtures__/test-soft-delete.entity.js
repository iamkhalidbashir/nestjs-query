"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSoftDeleteEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let TestSoftDeleteEntity = class TestSoftDeleteEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)({ name: 'test_entity_pk' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestSoftDeleteEntity.prototype, "testEntityPk", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'string_type' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestSoftDeleteEntity.prototype, "stringType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    (0, tslib_1.__metadata)("design:type", Date)
], TestSoftDeleteEntity.prototype, "deletedAt", void 0);
TestSoftDeleteEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], TestSoftDeleteEntity);
exports.TestSoftDeleteEntity = TestSoftDeleteEntity;
//# sourceMappingURL=test-soft-delete.entity.js.map