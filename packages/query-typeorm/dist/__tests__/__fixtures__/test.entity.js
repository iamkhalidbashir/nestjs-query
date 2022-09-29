"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const test_entity_relation_entity_1 = require("./test-entity-relation.entity");
const test_relation_entity_1 = require("./test-relation.entity");
let TestEntity = class TestEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)({ name: 'test_entity_pk' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestEntity.prototype, "testEntityPk", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'string_type' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestEntity.prototype, "stringType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'bool_type' }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TestEntity.prototype, "boolType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'number_type' }),
    (0, tslib_1.__metadata)("design:type", Number)
], TestEntity.prototype, "numberType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'date_type' }),
    (0, tslib_1.__metadata)("design:type", Date)
], TestEntity.prototype, "dateType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('TestRelation', 'testEntity'),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "testRelations", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => test_relation_entity_1.TestRelation, (tr) => tr.manyTestEntities, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "manyTestRelations", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToMany)(() => test_relation_entity_1.TestRelation, { onDelete: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinTable)(),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "manyToManyUniDirectional", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => test_relation_entity_1.TestRelation, (relation) => relation.oneTestEntity),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", test_relation_entity_1.TestRelation)
], TestEntity.prototype, "oneTestRelation", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => test_entity_relation_entity_1.TestEntityRelationEntity, (ter) => ter.testEntity),
    (0, tslib_1.__metadata)("design:type", test_entity_relation_entity_1.TestEntityRelationEntity)
], TestEntity.prototype, "testEntityRelation", void 0);
TestEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=test.entity.js.map