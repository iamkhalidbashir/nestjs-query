"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityTestRelationEntity = void 0;
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const test_relation_entity_1 = require("./test-relation.entity");
const test_entity_1 = require("./test.entity");
let TestEntityTestRelationEntity = class TestEntityTestRelationEntity extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.ForeignKey)(() => test_entity_1.TestEntity),
    (0, sequelize_typescript_1.Column)({ field: 'test_entity_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], TestEntityTestRelationEntity.prototype, "testEntityId", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.ForeignKey)(() => test_relation_entity_1.TestRelation),
    (0, sequelize_typescript_1.Column)({ field: 'test_relation_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], TestEntityTestRelationEntity.prototype, "testRelationId", void 0);
TestEntityTestRelationEntity = (0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Table)({})
], TestEntityTestRelationEntity);
exports.TestEntityTestRelationEntity = TestEntityTestRelationEntity;
//# sourceMappingURL=test-entity-test-relation.entity.js.map