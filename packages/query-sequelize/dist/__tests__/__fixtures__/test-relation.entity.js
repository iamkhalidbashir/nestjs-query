"use strict";
var TestRelation_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRelation = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const sequelize_typescript_1 = require("sequelize-typescript");
const test_entity_test_relation_entity_1 = require("./test-entity-test-relation.entity");
const test_entity_1 = require("./test.entity");
let TestRelation = TestRelation_1 = class TestRelation extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    (0, tslib_1.__metadata)("design:type", String)
], TestRelation.prototype, "testRelationPk", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Column)({ field: 'relation_name' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestRelation.prototype, "relationName", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.ForeignKey)(() => test_entity_1.TestEntity),
    (0, sequelize_typescript_1.Column)({ field: 'test_entity_id' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestRelation.prototype, "testEntityId", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsTo)(() => test_entity_1.TestEntity, 'testEntityId'),
    (0, tslib_1.__metadata)("design:type", test_entity_1.TestEntity)
], TestRelation.prototype, "testEntity", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsToMany)(() => test_entity_1.TestEntity, () => test_entity_test_relation_entity_1.TestEntityTestRelationEntity),
    (0, tslib_1.__metadata)("design:type", Array)
], TestRelation.prototype, "manyTestEntities", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsTo)(() => test_entity_1.TestEntity, 'oneTestEntityId'),
    (0, tslib_1.__metadata)("design:type", test_entity_1.TestEntity)
], TestRelation.prototype, "oneTestEntity", void 0);
TestRelation = TestRelation_1 = (0, tslib_1.__decorate)([
    (0, core_1.AssemblerSerializer)((instance) => instance.get({ plain: true }))
    // eslint-disable-next-line @typescript-eslint/no-use-before-define,@typescript-eslint/ban-types
    ,
    (0, core_1.AssemblerDeserializer)((obj) => TestRelation_1.build(obj)),
    (0, sequelize_typescript_1.Table)({ timestamps: false })
], TestRelation);
exports.TestRelation = TestRelation;
//# sourceMappingURL=test-relation.entity.js.map