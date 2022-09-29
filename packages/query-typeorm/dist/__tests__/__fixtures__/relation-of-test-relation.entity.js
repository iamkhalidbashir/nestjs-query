"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationOfTestRelationEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const test_relation_entity_1 = require("./test-relation.entity");
let RelationOfTestRelationEntity = class RelationOfTestRelationEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)({ name: 'test_relation_pk' }),
    (0, tslib_1.__metadata)("design:type", String)
], RelationOfTestRelationEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'relation_name' }),
    (0, tslib_1.__metadata)("design:type", String)
], RelationOfTestRelationEntity.prototype, "relationName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'test_relation_id' }),
    (0, tslib_1.__metadata)("design:type", String)
], RelationOfTestRelationEntity.prototype, "testRelationId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => test_relation_entity_1.TestRelation, (tr) => tr.testEntityRelation, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'test_relation_id' }),
    (0, tslib_1.__metadata)("design:type", test_relation_entity_1.TestRelation)
], RelationOfTestRelationEntity.prototype, "testRelation", void 0);
RelationOfTestRelationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)()
], RelationOfTestRelationEntity);
exports.RelationOfTestRelationEntity = RelationOfTestRelationEntity;
//# sourceMappingURL=relation-of-test-relation.entity.js.map