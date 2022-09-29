"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.PLAIN_TEST_RELATIONS = exports.PLAIN_TEST_ENTITIES = void 0;
const sequelize_fixture_1 = require("./sequelize.fixture");
const test_relation_entity_1 = require("./test-relation.entity");
const test_entity_1 = require("./test.entity");
exports.PLAIN_TEST_ENTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
    const testEntityPk = `test-entity-${i}`;
    return {
        testEntityPk,
        boolType: i % 2 === 0,
        dateType: new Date(`2020-02-${i}`),
        numberType: i,
        stringType: `foo${i}`,
    };
});
exports.PLAIN_TEST_RELATIONS = exports.PLAIN_TEST_ENTITIES.reduce((relations, te) => [
    ...relations,
    {
        testRelationPk: `test-relations-${te.testEntityPk}-1`,
        relationName: `${te.stringType}-test-relation-one`,
        testEntityId: te.testEntityPk,
        oneTestEntityId: te.testEntityPk,
    },
    {
        testRelationPk: `test-relations-${te.testEntityPk}-2`,
        relationName: `${te.stringType}-test-relation-two`,
        testEntityId: te.testEntityPk,
        oneTestEntityId: null,
    },
    {
        testRelationPk: `test-relations-${te.testEntityPk}-3`,
        relationName: `${te.stringType}-test-relation-three`,
        testEntityId: te.testEntityPk,
        oneTestEntityId: null,
    },
], []);
const seed = async (sequelize) => {
    await (0, sequelize_fixture_1.truncate)(sequelize);
    await test_entity_1.TestEntity.bulkCreate(exports.PLAIN_TEST_ENTITIES);
    await test_relation_entity_1.TestRelation.bulkCreate(exports.PLAIN_TEST_RELATIONS);
};
exports.seed = seed;
//# sourceMappingURL=seeds.js.map