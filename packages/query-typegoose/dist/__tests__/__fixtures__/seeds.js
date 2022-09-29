"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.TEST_REFERENCES_FOR_DISCRIMINATES = exports.TEST_REFERENCES = exports.TEST_DISCRIMINATED_ENTITIES = exports.TEST_ENTITIES = void 0;
/* eslint-disable no-underscore-dangle,@typescript-eslint/no-unsafe-return */
const typegoose_1 = require("@typegoose/typegoose");
const test_entity_1 = require("./test.entity");
const test_discriminated_entity_1 = require("./test-discriminated.entity");
const test_reference_entity_1 = require("./test-reference.entity");
exports.TEST_ENTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
    boolType: i % 2 === 0,
    dateType: new Date(`2020-02-${i}`),
    numberType: i,
    stringType: `foo${i}`,
}));
exports.TEST_DISCRIMINATED_ENTITIES = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
].map((i) => ({
    boolType: i % 2 === 0,
    dateType: new Date(`2020-02-${i}`),
    numberType: i,
    stringType: `foo${i}`,
    stringType2: `bar${i}`,
}));
exports.TEST_REFERENCES = exports.TEST_ENTITIES.reduce((relations, te) => [
    ...relations,
    {
        referenceName: `${te.stringType}-test-reference-1-one`,
    },
    {
        referenceName: `${te.stringType}-test-reference-2-two`,
    },
    {
        referenceName: `${te.stringType}-test-reference-3-three`,
    },
], []);
exports.TEST_REFERENCES_FOR_DISCRIMINATES = exports.TEST_DISCRIMINATED_ENTITIES.reduce((relations, tde) => [
    ...relations,
    {
        referenceName: `${tde.stringType}-test-reference-1-one`,
    },
    {
        referenceName: `${tde.stringType}-test-reference-2-two`,
    },
    {
        referenceName: `${tde.stringType}-test-reference-3-three`,
    },
], []);
const seed = async (connection) => {
    const TestEntityModel = (0, typegoose_1.getModelForClass)(test_entity_1.TestEntity, { existingConnection: connection });
    const TestReferencesModel = (0, typegoose_1.getModelForClass)(test_reference_entity_1.TestReference, { existingConnection: connection });
    const TestDiscriminatedModel = (0, typegoose_1.getDiscriminatorModelForClass)(TestEntityModel, test_discriminated_entity_1.TestDiscriminatedEntity);
    const testEntities = await TestEntityModel.create(exports.TEST_ENTITIES);
    const testDiscriminatedEntities = await TestDiscriminatedModel.create(exports.TEST_DISCRIMINATED_ENTITIES);
    const testReferences = await TestReferencesModel.create(exports.TEST_REFERENCES);
    const testReferencesForDiscriminates = await TestReferencesModel.create(exports.TEST_REFERENCES_FOR_DISCRIMINATES);
    testEntities.forEach((te, index) => Object.assign(exports.TEST_ENTITIES[index], te.toObject({ virtuals: true })));
    testDiscriminatedEntities.forEach((tde, index) => Object.assign(exports.TEST_DISCRIMINATED_ENTITIES[index], tde.toObject({ virtuals: true })));
    testReferences.forEach((tr, index) => Object.assign(exports.TEST_REFERENCES[index], tr.toObject({ virtuals: true })));
    testReferencesForDiscriminates.forEach((trfd, index) => Object.assign(exports.TEST_REFERENCES_FOR_DISCRIMINATES[index], trfd.toObject({ virtuals: true })));
    await Promise.all(testEntities.map(async (te, index) => {
        const references = testReferences.filter((tr) => tr.referenceName.includes(`${te.stringType}-`));
        exports.TEST_ENTITIES[index].testReference = references[0]._id;
        exports.TEST_ENTITIES[index].testReferences = references.map((r) => r._id);
        await te.updateOne({ $set: { testReferences: references.map((r) => r._id), testReference: references[0]._id } });
        await Promise.all(references.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            exports.TEST_REFERENCES.find((tr) => tr._id.toString() === r._id.toString()).testEntity = te._id;
            return r.updateOne({ $set: { testEntity: te._id } });
        }));
    }));
    await Promise.all(testDiscriminatedEntities.map(async (tde, index) => {
        const references = testReferencesForDiscriminates.filter((trfd) => trfd.referenceName.includes(`${tde.stringType}-`));
        exports.TEST_DISCRIMINATED_ENTITIES[index].testReference = references[0]._id;
        exports.TEST_DISCRIMINATED_ENTITIES[index].testReferences = references.map((r) => r._id);
        await tde.updateOne({ $set: { testReferences: references.map((r) => r._id), testReference: references[0]._id } });
        await Promise.all(references.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            exports.TEST_REFERENCES_FOR_DISCRIMINATES.find((tr) => tr._id.toString() === r._id.toString()).testEntity = tde._id;
            return r.updateOne({ $set: { testEntity: tde._id } });
        }));
    }));
};
exports.seed = seed;
//# sourceMappingURL=seeds.js.map