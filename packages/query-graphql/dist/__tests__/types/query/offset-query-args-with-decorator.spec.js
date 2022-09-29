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
describe('Offset paging strategy QueryArgsType with decorator options', () => {
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
        (0, graphql_1.ObjectType)('TestQuery'),
        (0, src_1.QueryOptions)({
            pagingStrategy: src_1.PagingStrategies.OFFSET,
            defaultResultSize: 2,
            maxResultsSize: 5,
            defaultFilter: { booleanField: { is: true } },
            defaultSort: [{ field: 'booleanField', direction: core_1.SortDirection.DESC }],
        })
    ], TestDto);
    let OffsetQueryOptionsArgs = class OffsetQueryOptionsArgs extends (0, src_1.QueryArgsType)(TestDto) {
    };
    OffsetQueryOptionsArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], OffsetQueryOptionsArgs);
    it('allow apply the options to the generated SDL', async () => {
        let TestOffsetQueryOptionsDecoratorResolver = class TestOffsetQueryOptionsDecoratorResolver {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(query) {
                return 'hello';
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => String),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [OffsetQueryOptionsArgs]),
            (0, tslib_1.__metadata)("design:returntype", String)
        ], TestOffsetQueryOptionsDecoratorResolver.prototype, "test", null);
        TestOffsetQueryOptionsDecoratorResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestOffsetQueryOptionsDecoratorResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestOffsetQueryOptionsDecoratorResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should validate a maxResultsSize for paging.limit', () => {
        const queryObj = {
            paging: { limit: 10 },
        };
        const queryInstance = (0, class_transformer_1.plainToClass)(OffsetQueryOptionsArgs, queryObj);
        expect((0, class_validator_1.validateSync)(queryInstance)).toEqual([
            {
                children: [],
                constraints: {
                    PropertyMax: 'Field paging.limit max allowed value is `5`.',
                },
                property: 'paging',
                target: queryObj,
                value: queryObj.paging,
            },
        ]);
    });
});
//# sourceMappingURL=offset-query-args-with-decorator.spec.js.map