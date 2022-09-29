"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = exports.CONNECTION_OPTIONS = void 0;
const test_entity_test_relation_entity_1 = require("./test-entity-test-relation.entity");
const test_relation_entity_1 = require("./test-relation.entity");
const test_entity_1 = require("./test.entity");
const seeds_1 = require("./seeds");
exports.CONNECTION_OPTIONS = {
    dialect: 'sqlite',
    database: ':memory:',
    logging: false,
    models: [test_entity_1.TestEntity, test_entity_test_relation_entity_1.TestEntityTestRelationEntity, test_relation_entity_1.TestRelation],
};
const truncate = async (sequelize) => {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
};
exports.truncate = truncate;
const refresh = async (sequelize) => {
    await (0, exports.truncate)(sequelize);
    return (0, seeds_1.seed)(sequelize);
};
exports.refresh = refresh;
//# sourceMappingURL=sequelize.fixture.js.map