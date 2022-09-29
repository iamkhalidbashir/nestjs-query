"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.TEST_RELATIONS_OF_RELATION = exports.TEST_RELATIONS = exports.TEST_SOFT_DELETE_ENTITIES = exports.TEST_ENTITIES = void 0;
const typeorm_1 = require("typeorm");
const test_relation_entity_1 = require("./test-relation.entity");
const test_soft_delete_entity_1 = require("./test-soft-delete.entity");
const test_entity_1 = require("./test.entity");
const relation_of_test_relation_entity_1 = require("./relation-of-test-relation.entity");
exports.TEST_ENTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
    const testEntityPk = `test-entity-${i}`;
    return {
        testEntityPk,
        boolType: i % 2 === 0,
        dateType: new Date(`2020-02-${i}`),
        numberType: i,
        stringType: `foo${i}`,
    };
});
exports.TEST_SOFT_DELETE_ENTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
    const testEntityPk = `test-entity-${i}`;
    return {
        testEntityPk,
        stringType: `foo${i}`,
    };
});
exports.TEST_RELATIONS = exports.TEST_ENTITIES.reduce((relations, te) => [
    ...relations,
    {
        testRelationPk: `test-relations-${te.testEntityPk}-1`,
        relationName: `${te.stringType}-test-relation-one`,
        testEntityId: te.testEntityPk,
        uniDirectionalTestEntityId: te.testEntityPk,
    },
    {
        testRelationPk: `test-relations-${te.testEntityPk}-2`,
        relationName: `${te.stringType}-test-relation-two`,
        testEntityId: te.testEntityPk,
        uniDirectionalTestEntityId: te.testEntityPk,
    },
    {
        testRelationPk: `test-relations-${te.testEntityPk}-3`,
        relationName: `${te.stringType}-test-relation-three`,
        testEntityId: te.testEntityPk,
        uniDirectionalTestEntityId: te.testEntityPk,
    },
], []);
exports.TEST_RELATIONS_OF_RELATION = exports.TEST_RELATIONS.map((testRelation) => ({
    relationName: `test-relation-of-${testRelation.relationName}`,
    id: `relation-of-test-relation-${testRelation.relationName}`,
    testRelationId: testRelation.testRelationPk,
}));
const seed = async (connection = (0, typeorm_1.getConnection)()) => {
    const testEntityRepo = connection.getRepository(test_entity_1.TestEntity);
    const testRelationRepo = connection.getRepository(test_relation_entity_1.TestRelation);
    const relationOfTestRelationRepo = connection.getRepository(relation_of_test_relation_entity_1.RelationOfTestRelationEntity);
    const testSoftDeleteRepo = connection.getRepository(test_soft_delete_entity_1.TestSoftDeleteEntity);
    const testEntities = await testEntityRepo.save(exports.TEST_ENTITIES.map((e) => ({ ...e })));
    const testRelations = await testRelationRepo.save(exports.TEST_RELATIONS.map((r) => ({ ...r })));
    await relationOfTestRelationRepo.save(exports.TEST_RELATIONS_OF_RELATION.map((r) => ({ ...r })));
    await Promise.all(testEntities.map((te) => {
        // eslint-disable-next-line no-param-reassign
        te.oneTestRelation = testRelations.find((tr) => tr.testRelationPk === `test-relations-${te.testEntityPk}-1`);
        if (te.numberType % 2 === 0) {
            // eslint-disable-next-line no-param-reassign
            te.manyTestRelations = testRelations.filter((tr) => tr.relationName.endsWith('two'));
        }
        if (te.numberType % 3 === 0) {
            // eslint-disable-next-line no-param-reassign
            te.manyToManyUniDirectional = testRelations.filter((tr) => tr.relationName.endsWith('three'));
        }
        return testEntityRepo.save(te);
    }));
    await Promise.all(testRelations.map(async (te) => {
        const relationOfTestRelationEntity = exports.TEST_RELATIONS_OF_RELATION.find((r) => r.testRelationId === te.testRelationPk);
        te.relationOfTestRelationId = relationOfTestRelationEntity === null || relationOfTestRelationEntity === void 0 ? void 0 : relationOfTestRelationEntity.id;
        return testRelationRepo.save(te);
    }));
    await testSoftDeleteRepo.save(exports.TEST_SOFT_DELETE_ENTITIES.map((e) => ({ ...e })));
};
exports.seed = seed;
//# sourceMappingURL=seeds.js.map