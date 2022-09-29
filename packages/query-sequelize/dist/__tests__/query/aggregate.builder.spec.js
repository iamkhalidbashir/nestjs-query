"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = (0, tslib_1.__importDefault)(require("sequelize"));
const testing_1 = require("@nestjs/testing");
const sequelize_2 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_fixture_1 = require("../__fixtures__/sequelize.fixture");
const test_entity_test_relation_entity_1 = require("../__fixtures__/test-entity-test-relation.entity");
const test_relation_entity_1 = require("../__fixtures__/test-relation.entity");
const test_entity_1 = require("../__fixtures__/test.entity");
const query_1 = require("../../src/query");
describe('AggregateBuilder', () => {
    let moduleRef;
    const createAggregateBuilder = () => new query_1.AggregateBuilder(test_entity_1.TestEntity);
    const expectAggregateQuery = (agg, expected) => {
        const actual = createAggregateBuilder().build(agg);
        expect(actual).toEqual(expected);
    };
    afterEach(() => moduleRef.get(sequelize_typescript_1.Sequelize).close());
    beforeEach(async () => {
        moduleRef = await testing_1.Test.createTestingModule({
            imports: [
                sequelize_2.SequelizeModule.forRoot(sequelize_fixture_1.CONNECTION_OPTIONS),
                sequelize_2.SequelizeModule.forFeature([test_entity_1.TestEntity, test_relation_entity_1.TestRelation, test_entity_test_relation_entity_1.TestEntityTestRelationEntity]),
            ],
        }).compile();
        await moduleRef.get(sequelize_typescript_1.Sequelize).sync();
    });
    it('should throw an error if no selects are generated', () => {
        expect(() => createAggregateBuilder().build({})).toThrow('No aggregate fields found.');
    });
    it('should create selects for all aggregate functions', () => {
        expectAggregateQuery({
            count: ['testEntityPk', 'stringType'],
            avg: ['numberType'],
            sum: ['numberType'],
            max: ['stringType', 'dateType', 'numberType'],
            min: ['stringType', 'dateType', 'numberType'],
        }, {
            attributes: [
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('test_entity_pk')), 'COUNT_testEntityPk'],
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('string_type')), 'COUNT_stringType'],
                [sequelize_1.default.fn('SUM', sequelize_1.default.col('number_type')), 'SUM_numberType'],
                [sequelize_1.default.fn('AVG', sequelize_1.default.col('number_type')), 'AVG_numberType'],
                [sequelize_1.default.fn('MAX', sequelize_1.default.col('string_type')), 'MAX_stringType'],
                [sequelize_1.default.fn('MAX', sequelize_1.default.col('date_type')), 'MAX_dateType'],
                [sequelize_1.default.fn('MAX', sequelize_1.default.col('number_type')), 'MAX_numberType'],
                [sequelize_1.default.fn('MIN', sequelize_1.default.col('string_type')), 'MIN_stringType'],
                [sequelize_1.default.fn('MIN', sequelize_1.default.col('date_type')), 'MIN_dateType'],
                [sequelize_1.default.fn('MIN', sequelize_1.default.col('number_type')), 'MIN_numberType'],
            ],
        });
    });
    it('should create selects for all aggregate functions and group bys', () => {
        expectAggregateQuery({
            groupBy: ['stringType', 'boolType'],
            count: ['testEntityPk'],
        }, {
            attributes: [
                [sequelize_1.default.col('string_type'), 'GROUP_BY_stringType'],
                [sequelize_1.default.col('bool_type'), 'GROUP_BY_boolType'],
                [sequelize_1.default.fn('COUNT', sequelize_1.default.col('test_entity_pk')), 'COUNT_testEntityPk'],
            ],
        });
    });
    describe('.convertToAggregateResponse', () => {
        it('should convert a flat response into an Aggregtate response', () => {
            const dbResult = [
                {
                    GROUP_BY_stringType: 'z',
                    COUNT_testEntityPk: 10,
                    SUM_numberType: 55,
                    AVG_numberType: 5,
                    MAX_stringType: 'z',
                    MAX_numberType: 10,
                    MIN_stringType: 'a',
                    MIN_numberType: 1,
                },
            ];
            expect(query_1.AggregateBuilder.convertToAggregateResponse(dbResult)).toEqual([
                {
                    groupBy: { stringType: 'z' },
                    count: { testEntityPk: 10 },
                    sum: { numberType: 55 },
                    avg: { numberType: 5 },
                    max: { stringType: 'z', numberType: 10 },
                    min: { stringType: 'a', numberType: 1 },
                },
            ]);
        });
        it('should throw an error if a column is not expected', () => {
            const dbResult = [
                {
                    COUNTtestEntityPk: 10,
                },
            ];
            expect(() => query_1.AggregateBuilder.convertToAggregateResponse(dbResult)).toThrow('Unknown aggregate column encountered.');
        });
    });
});
//# sourceMappingURL=aggregate.builder.spec.js.map