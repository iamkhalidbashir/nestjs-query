"use strict";
var TestEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const sequelize_typescript_1 = require("sequelize-typescript");
const test_entity_test_relation_entity_1 = require("./test-entity-test-relation.entity");
const test_relation_entity_1 = require("./test-relation.entity");
let TestEntity = TestEntity_1 = class TestEntity extends sequelize_typescript_1.Model {
};
(0, tslib_1.__decorate)([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ field: 'test_entity_pk' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestEntity.prototype, "testEntityPk", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Column)({ field: 'string_type' }),
    (0, tslib_1.__metadata)("design:type", String)
], TestEntity.prototype, "stringType", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Column)({ field: 'bool_type' }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], TestEntity.prototype, "boolType", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Column)({ field: 'number_type' }),
    (0, tslib_1.__metadata)("design:type", Number)
], TestEntity.prototype, "numberType", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.Column)({ field: 'date_type' }),
    (0, tslib_1.__metadata)("design:type", Date)
], TestEntity.prototype, "dateType", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.HasMany)(() => test_relation_entity_1.TestRelation),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "testRelations", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.BelongsToMany)(() => test_relation_entity_1.TestRelation, () => test_entity_test_relation_entity_1.TestEntityTestRelationEntity),
    (0, tslib_1.__metadata)("design:type", Array)
], TestEntity.prototype, "manyTestRelations", void 0);
(0, tslib_1.__decorate)([
    (0, sequelize_typescript_1.HasOne)(() => test_relation_entity_1.TestRelation, 'oneTestEntityId'),
    (0, tslib_1.__metadata)("design:type", test_relation_entity_1.TestRelation)
], TestEntity.prototype, "oneTestRelation", void 0);
TestEntity = TestEntity_1 = (0, tslib_1.__decorate)([
    (0, core_1.AssemblerSerializer)((instance) => instance.get({ plain: true }))
    // eslint-disable-next-line @typescript-eslint/no-use-before-define,@typescript-eslint/ban-types
    ,
    (0, core_1.AssemblerDeserializer)((obj) => TestEntity_1.build(obj)),
    (0, sequelize_typescript_1.Table)({ timestamps: false })
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=test.entity.js.map