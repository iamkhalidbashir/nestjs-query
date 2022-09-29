"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('None paging strategy QueryArgsType with manual options', () => {
    afterEach(() => jest.clearAllMocks());
    let TestDto = class TestDto {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.ID),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "idField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.ID, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "idFieldOption", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)({ nullable: true }),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDto.prototype, "stringFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], TestDto.prototype, "booleanField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)({ nullable: true }),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], TestDto.prototype, "booleanFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)({ nullable: true }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "numberFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Float),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "floatField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Float, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "floatFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Int),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "intField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Int, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "intFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLTimestamp),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "timestampField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLTimestamp, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "timestampFieldOptional", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "date", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "dateOptional", void 0);
    TestDto = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('TestQuery')
    ], TestDto);
    let TestFilterRequiredDto = class TestFilterRequiredDto {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)({ filterRequired: true }),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestFilterRequiredDto.prototype, "requiredFilterableField", void 0);
    TestFilterRequiredDto = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestFilterRequiredDto);
    let TestNoPagingQuery = class TestNoPagingQuery extends (0, src_1.QueryArgsType)(TestDto, { pagingStrategy: src_1.PagingStrategies.NONE }) {
    };
    TestNoPagingQuery = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], TestNoPagingQuery);
    it('create a query for string fields', async () => {
        let TestNonePagingStrategyResolver = class TestNonePagingStrategyResolver {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(query) {
                return 'hello';
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => String),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [TestNoPagingQuery]),
            (0, tslib_1.__metadata)("design:returntype", String)
        ], TestNonePagingStrategyResolver.prototype, "test", null);
        TestNonePagingStrategyResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestNonePagingStrategyResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestNonePagingStrategyResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should sorting to the correct instance of sorting', () => {
        const queryObj = {
            sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_LAST }],
        };
        const queryInstance = (0, class_transformer_1.plainToClass)(TestNoPagingQuery, queryObj);
        expect((0, class_validator_1.validateSync)(queryInstance)).toEqual([]);
        expect(queryInstance.sorting[0]).toBeInstanceOf(TestNoPagingQuery.SortType);
    });
    it('should make filter to the correct instance of sorting', () => {
        const queryObj = {
            filter: {
                stringField: { eq: 'foo' },
            },
        };
        const queryInstance = (0, class_transformer_1.plainToClass)(TestNoPagingQuery, queryObj);
        expect((0, class_validator_1.validateSync)(queryInstance)).toEqual([]);
        expect(queryInstance.filter).toBeInstanceOf(TestNoPagingQuery.FilterType);
    });
    it('should make the filter required if there is a filterRequired field', async () => {
        let TestFilterRequiredQuery = class TestFilterRequiredQuery extends (0, src_1.QueryArgsType)(TestFilterRequiredDto, {
            pagingStrategy: src_1.PagingStrategies.NONE,
        }) {
        };
        TestFilterRequiredQuery = (0, tslib_1.__decorate)([
            (0, graphql_1.ArgsType)()
        ], TestFilterRequiredQuery);
        let TestNonePagingFilterRequiredResolver = class TestNonePagingFilterRequiredResolver {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(query) {
                return 'hello';
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => String),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [TestFilterRequiredQuery]),
            (0, tslib_1.__metadata)("design:returntype", String)
        ], TestNonePagingFilterRequiredResolver.prototype, "test", null);
        TestNonePagingFilterRequiredResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestNonePagingFilterRequiredResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestNonePagingFilterRequiredResolver]);
        expect(schema).toMatchSnapshot();
    });
    describe('options', () => {
        let NoPagingQueryOptionsDTO = class NoPagingQueryOptionsDTO extends TestDto {
        };
        NoPagingQueryOptionsDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)()
        ], NoPagingQueryOptionsDTO);
        let NoPagingQueryOptionsArgs = class NoPagingQueryOptionsArgs extends (0, src_1.QueryArgsType)(NoPagingQueryOptionsDTO, {
            pagingStrategy: src_1.PagingStrategies.NONE,
            defaultResultSize: 2,
            maxResultsSize: 5,
            defaultFilter: { booleanField: { is: true } },
            defaultSort: [{ field: 'booleanField', direction: core_1.SortDirection.DESC }],
        }) {
        };
        NoPagingQueryOptionsArgs = (0, tslib_1.__decorate)([
            (0, graphql_1.ArgsType)()
        ], NoPagingQueryOptionsArgs);
        it('allow apply the options to the generated SDL', async () => {
            let TestNoPagingQueryManualOptionsResolver = class TestNoPagingQueryManualOptionsResolver {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(query) {
                    return 'hello';
                }
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Query)(() => String),
                (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
                (0, tslib_1.__metadata)("design:type", Function),
                (0, tslib_1.__metadata)("design:paramtypes", [NoPagingQueryOptionsArgs]),
                (0, tslib_1.__metadata)("design:returntype", String)
            ], TestNoPagingQueryManualOptionsResolver.prototype, "test", null);
            TestNoPagingQueryManualOptionsResolver = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)()
            ], TestNoPagingQueryManualOptionsResolver);
            const schema = await (0, __fixtures__1.generateSchema)([TestNoPagingQueryManualOptionsResolver]);
            expect(schema).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=none-query-args.type.spec.js.map