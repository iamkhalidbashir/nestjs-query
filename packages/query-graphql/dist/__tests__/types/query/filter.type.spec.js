"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('filter types', () => {
    let NumberEnum;
    (function (NumberEnum) {
        NumberEnum[NumberEnum["ONE"] = 0] = "ONE";
        NumberEnum[NumberEnum["TWO"] = 1] = "TWO";
        NumberEnum[NumberEnum["THREE"] = 2] = "THREE";
        NumberEnum[NumberEnum["FOUR"] = 3] = "FOUR";
    })(NumberEnum || (NumberEnum = {}));
    let StringEnum;
    (function (StringEnum) {
        StringEnum["ONE_STR"] = "one";
        StringEnum["TWO_STR"] = "two";
        StringEnum["THREE_STR"] = "three";
        StringEnum["FOUR_STR"] = "four";
    })(StringEnum || (StringEnum = {}));
    (0, graphql_1.registerEnumType)(StringEnum, {
        name: 'StringEnum',
    });
    (0, graphql_1.registerEnumType)(NumberEnum, {
        name: 'NumberEnum',
    });
    let BaseType = class BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], BaseType.prototype, "id", void 0);
    BaseType = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], BaseType);
    let TestRelation = class TestRelation extends BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestRelation.prototype, "relationName", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestRelation.prototype, "relationAge", void 0);
    TestRelation = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('TestRelationDto')
    ], TestRelation);
    let TestDto = class TestDto extends BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], TestDto.prototype, "boolField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "dateField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Float),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "floatField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Int),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "intField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => StringEnum),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDto.prototype, "stringEnumField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => NumberEnum),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "numberEnumField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.GraphQLTimestamp),
        (0, tslib_1.__metadata)("design:type", Date)
    ], TestDto.prototype, "timestampField", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "nonFilterField", void 0);
    TestDto = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('TestFilterDto'),
        (0, src_1.Relation)('unFilterableRelation', () => TestRelation),
        (0, src_1.FilterableRelation)('filterableRelation', () => TestRelation),
        (0, src_1.UnPagedRelation)('unPagedRelations', () => TestRelation),
        (0, src_1.FilterableUnPagedRelation)('filterableUnPagedRelations', () => TestRelation),
        (0, src_1.OffsetConnection)('unFilterableOffsetConnection', () => TestRelation),
        (0, src_1.FilterableOffsetConnection)('filterableOffsetConnection', () => TestRelation),
        (0, src_1.CursorConnection)('unFilterableCursorConnection', () => TestRelation),
        (0, src_1.FilterableCursorConnection)('filterableCursorConnection', () => TestRelation)
    ], TestDto);
    describe('FilterType', () => {
        const TestGraphQLFilter = (0, src_1.FilterType)(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => (0, src_1.FilterType)(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', async () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Query)(() => graphql_1.Int),
                (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                (0, tslib_1.__metadata)("design:type", Function),
                (0, tslib_1.__metadata)("design:paramtypes", [TestDtoFilter]),
                (0, tslib_1.__metadata)("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)()
            ], FilterTypeSpec);
            const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
            expect(schema).toMatchSnapshot();
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestNoFields')
            ], TestInvalidFilter);
            expect(() => (0, src_1.FilterType)(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => EnumField),
                (0, tslib_1.__metadata)("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestBadField')
            ], TestInvalidFilter);
            expect(() => (0, src_1.FilterType)(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        describe('allowedComparisons option', () => {
            let TestAllowedComparisonsDto = class TestAllowedComparisonsDto extends BaseType {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ allowedComparisons: ['is'] }),
                (0, tslib_1.__metadata)("design:type", Boolean)
            ], TestAllowedComparisonsDto.prototype, "boolField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ allowedComparisons: ['eq', 'neq'] }),
                (0, tslib_1.__metadata)("design:type", Date)
            ], TestAllowedComparisonsDto.prototype, "dateField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => graphql_1.Float, { allowedComparisons: ['gt', 'gte'] }),
                (0, tslib_1.__metadata)("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "floatField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => graphql_1.Int, { allowedComparisons: ['lt', 'lte'] }),
                (0, tslib_1.__metadata)("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "intField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ allowedComparisons: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'] }),
                (0, tslib_1.__metadata)("design:type", Number)
            ], TestAllowedComparisonsDto.prototype, "numberField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ allowedComparisons: ['like', 'notLike'] }),
                (0, tslib_1.__metadata)("design:type", String)
            ], TestAllowedComparisonsDto.prototype, "stringField", void 0);
            TestAllowedComparisonsDto = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestAllowedComparison')
            ], TestAllowedComparisonsDto);
            const TestGraphQLComparisonFilter = (0, src_1.FilterType)(TestAllowedComparisonsDto);
            let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
            };
            TestComparisonDtoFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], TestComparisonDtoFilter);
            it('should only expose allowed comparisons', async () => {
                let FilterTypeSpec = class FilterTypeSpec {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    test(input) {
                        return 1;
                    }
                };
                (0, tslib_1.__decorate)([
                    (0, graphql_1.Query)(() => graphql_1.Int),
                    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                    (0, tslib_1.__metadata)("design:type", Function),
                    (0, tslib_1.__metadata)("design:paramtypes", [TestComparisonDtoFilter]),
                    (0, tslib_1.__metadata)("design:returntype", Number)
                ], FilterTypeSpec.prototype, "test", null);
                FilterTypeSpec = (0, tslib_1.__decorate)([
                    (0, graphql_1.Resolver)()
                ], FilterTypeSpec);
                const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
                expect(schema).toMatchSnapshot();
            });
        });
        describe('allowedBooleanExpressions option', () => {
            describe('only and boolean expressions', () => {
                let TestOnlyAndBooleanExpressionsDto = class TestOnlyAndBooleanExpressionsDto extends BaseType {
                };
                (0, tslib_1.__decorate)([
                    (0, src_1.FilterableField)(),
                    (0, tslib_1.__metadata)("design:type", Number)
                ], TestOnlyAndBooleanExpressionsDto.prototype, "numberField", void 0);
                TestOnlyAndBooleanExpressionsDto = (0, tslib_1.__decorate)([
                    (0, graphql_1.ObjectType)('TestAllowedComparisons'),
                    (0, src_1.QueryOptions)({ allowedBooleanExpressions: ['and'] })
                ], TestOnlyAndBooleanExpressionsDto);
                const TestGraphQLComparisonFilter = (0, src_1.FilterType)(TestOnlyAndBooleanExpressionsDto);
                let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
                };
                TestComparisonDtoFilter = (0, tslib_1.__decorate)([
                    (0, graphql_1.InputType)()
                ], TestComparisonDtoFilter);
                it('should only expose allowed comparisons', async () => {
                    let FilterTypeSpec = class FilterTypeSpec {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        test(input) {
                            return 1;
                        }
                    };
                    (0, tslib_1.__decorate)([
                        (0, graphql_1.Query)(() => graphql_1.Int),
                        (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                        (0, tslib_1.__metadata)("design:type", Function),
                        (0, tslib_1.__metadata)("design:paramtypes", [TestComparisonDtoFilter]),
                        (0, tslib_1.__metadata)("design:returntype", Number)
                    ], FilterTypeSpec.prototype, "test", null);
                    FilterTypeSpec = (0, tslib_1.__decorate)([
                        (0, graphql_1.Resolver)()
                    ], FilterTypeSpec);
                    const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
                    expect(schema).toMatchSnapshot();
                });
            });
            describe('only or boolean expressions', () => {
                let TestOnlyOrBooleanExpressionsDto = class TestOnlyOrBooleanExpressionsDto extends BaseType {
                };
                (0, tslib_1.__decorate)([
                    (0, src_1.FilterableField)(),
                    (0, tslib_1.__metadata)("design:type", Number)
                ], TestOnlyOrBooleanExpressionsDto.prototype, "numberField", void 0);
                TestOnlyOrBooleanExpressionsDto = (0, tslib_1.__decorate)([
                    (0, graphql_1.ObjectType)('TestAllowedComparisons'),
                    (0, src_1.QueryOptions)({ allowedBooleanExpressions: ['or'] })
                ], TestOnlyOrBooleanExpressionsDto);
                const TestGraphQLComparisonFilter = (0, src_1.FilterType)(TestOnlyOrBooleanExpressionsDto);
                let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
                };
                TestComparisonDtoFilter = (0, tslib_1.__decorate)([
                    (0, graphql_1.InputType)()
                ], TestComparisonDtoFilter);
                it('should only expose allowed comparisons', async () => {
                    let FilterTypeSpec = class FilterTypeSpec {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        test(input) {
                            return 1;
                        }
                    };
                    (0, tslib_1.__decorate)([
                        (0, graphql_1.Query)(() => graphql_1.Int),
                        (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                        (0, tslib_1.__metadata)("design:type", Function),
                        (0, tslib_1.__metadata)("design:paramtypes", [TestComparisonDtoFilter]),
                        (0, tslib_1.__metadata)("design:returntype", Number)
                    ], FilterTypeSpec.prototype, "test", null);
                    FilterTypeSpec = (0, tslib_1.__decorate)([
                        (0, graphql_1.Resolver)()
                    ], FilterTypeSpec);
                    const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
                    expect(schema).toMatchSnapshot();
                });
            });
            describe('no boolean expressions', () => {
                let TestNoBooleanExpressionsDto = class TestNoBooleanExpressionsDto extends BaseType {
                };
                (0, tslib_1.__decorate)([
                    (0, src_1.FilterableField)(),
                    (0, tslib_1.__metadata)("design:type", Number)
                ], TestNoBooleanExpressionsDto.prototype, "numberField", void 0);
                TestNoBooleanExpressionsDto = (0, tslib_1.__decorate)([
                    (0, graphql_1.ObjectType)('TestAllowedComparisons'),
                    (0, src_1.QueryOptions)({ allowedBooleanExpressions: [] })
                ], TestNoBooleanExpressionsDto);
                const TestGraphQLComparisonFilter = (0, src_1.FilterType)(TestNoBooleanExpressionsDto);
                let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
                };
                TestComparisonDtoFilter = (0, tslib_1.__decorate)([
                    (0, graphql_1.InputType)()
                ], TestComparisonDtoFilter);
                it('should only expose allowed comparisons', async () => {
                    let FilterTypeSpec = class FilterTypeSpec {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        test(input) {
                            return 1;
                        }
                    };
                    (0, tslib_1.__decorate)([
                        (0, graphql_1.Query)(() => graphql_1.Int),
                        (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                        (0, tslib_1.__metadata)("design:type", Function),
                        (0, tslib_1.__metadata)("design:paramtypes", [TestComparisonDtoFilter]),
                        (0, tslib_1.__metadata)("design:returntype", Number)
                    ], FilterTypeSpec.prototype, "test", null);
                    FilterTypeSpec = (0, tslib_1.__decorate)([
                        (0, graphql_1.Resolver)()
                    ], FilterTypeSpec);
                    const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
                    expect(schema).toMatchSnapshot();
                });
            });
        });
        describe('filterRequired option', () => {
            let TestFilterRequiredDto = class TestFilterRequiredDto extends BaseType {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ filterRequired: true }),
                (0, tslib_1.__metadata)("design:type", Boolean)
            ], TestFilterRequiredDto.prototype, "requiredField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)({ filterRequired: false }),
                (0, tslib_1.__metadata)("design:type", Date)
            ], TestFilterRequiredDto.prototype, "nonRequiredField", void 0);
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(),
                (0, tslib_1.__metadata)("design:type", Number)
            ], TestFilterRequiredDto.prototype, "notSpecifiedField", void 0);
            TestFilterRequiredDto = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestFilterRequiredComparison')
            ], TestFilterRequiredDto);
            const TestGraphQLComparisonFilter = (0, src_1.FilterType)(TestFilterRequiredDto);
            let TestComparisonDtoFilter = class TestComparisonDtoFilter extends TestGraphQLComparisonFilter {
            };
            TestComparisonDtoFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], TestComparisonDtoFilter);
            it('should only expose allowed comparisons', async () => {
                let FilterTypeSpec = class FilterTypeSpec {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    test(input) {
                        return 1;
                    }
                };
                (0, tslib_1.__decorate)([
                    (0, graphql_1.Query)(() => graphql_1.Int),
                    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                    (0, tslib_1.__metadata)("design:type", Function),
                    (0, tslib_1.__metadata)("design:paramtypes", [TestComparisonDtoFilter]),
                    (0, tslib_1.__metadata)("design:returntype", Number)
                ], FilterTypeSpec.prototype, "test", null);
                FilterTypeSpec = (0, tslib_1.__decorate)([
                    (0, graphql_1.Resolver)()
                ], FilterTypeSpec);
                const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
                expect(schema).toMatchSnapshot();
            });
        });
    });
    describe('UpdateFilterType', () => {
        const TestGraphQLFilter = (0, src_1.UpdateFilterType)(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => (0, src_1.UpdateFilterType)(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', async () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Query)(() => graphql_1.Int),
                (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                (0, tslib_1.__metadata)("design:type", Function),
                (0, tslib_1.__metadata)("design:paramtypes", [TestDtoFilter]),
                (0, tslib_1.__metadata)("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)()
            ], FilterTypeSpec);
            const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
            expect(schema).toMatchSnapshot();
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestNoFields')
            ], TestInvalidFilter);
            expect(() => (0, src_1.UpdateFilterType)(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => EnumField),
                (0, tslib_1.__metadata)("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestBadField')
            ], TestInvalidFilter);
            expect(() => (0, src_1.UpdateFilterType)(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
    describe('DeleteFilterType', () => {
        const TestGraphQLFilter = (0, src_1.DeleteFilterType)(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => (0, src_1.DeleteFilterType)(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', async () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Query)(() => graphql_1.Int),
                (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                (0, tslib_1.__metadata)("design:type", Function),
                (0, tslib_1.__metadata)("design:paramtypes", [TestDtoFilter]),
                (0, tslib_1.__metadata)("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)()
            ], FilterTypeSpec);
            const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
            expect(schema).toMatchSnapshot();
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestNoFields')
            ], TestInvalidFilter);
            expect(() => (0, src_1.DeleteFilterType)(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => EnumField),
                (0, tslib_1.__metadata)("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestBadField')
            ], TestInvalidFilter);
            expect(() => (0, src_1.DeleteFilterType)(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
    describe('SubscriptionFilterType', () => {
        const TestGraphQLFilter = (0, src_1.SubscriptionFilterType)(TestDto);
        let TestDtoFilter = class TestDtoFilter extends TestGraphQLFilter {
        };
        TestDtoFilter = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], TestDtoFilter);
        it('should throw an error if the class is not annotated with @ObjectType', () => {
            class TestInvalidFilter {
            }
            expect(() => (0, src_1.SubscriptionFilterType)(TestInvalidFilter)).toThrow('No fields found to create FilterType. Ensure TestInvalidFilter is annotated with @nestjs/graphql @ObjectType');
        });
        it('should create the correct filter graphql schema', async () => {
            let FilterTypeSpec = class FilterTypeSpec {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                test(input) {
                    return 1;
                }
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Query)(() => graphql_1.Int),
                (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
                (0, tslib_1.__metadata)("design:type", Function),
                (0, tslib_1.__metadata)("design:paramtypes", [TestDtoFilter]),
                (0, tslib_1.__metadata)("design:returntype", Number)
            ], FilterTypeSpec.prototype, "test", null);
            FilterTypeSpec = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)()
            ], FilterTypeSpec);
            const schema = await (0, __fixtures__1.generateSchema)([FilterTypeSpec]);
            expect(schema).toMatchSnapshot();
        });
        it('should throw an error if no fields are found', () => {
            let TestInvalidFilter = class TestInvalidFilter {
            };
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestNoFields')
            ], TestInvalidFilter);
            expect(() => (0, src_1.SubscriptionFilterType)(TestInvalidFilter)).toThrow('No fields found to create GraphQLFilter for TestInvalidFilter');
        });
        it('should throw an error when the field type is unknown', () => {
            let EnumField;
            (function (EnumField) {
                EnumField["ONE"] = "one";
            })(EnumField || (EnumField = {}));
            let TestInvalidFilter = class TestInvalidFilter {
            };
            (0, tslib_1.__decorate)([
                (0, src_1.FilterableField)(() => EnumField),
                (0, tslib_1.__metadata)("design:type", String)
            ], TestInvalidFilter.prototype, "fakeType", void 0);
            TestInvalidFilter = (0, tslib_1.__decorate)([
                (0, graphql_1.ObjectType)('TestBadField')
            ], TestInvalidFilter);
            expect(() => (0, src_1.SubscriptionFilterType)(TestInvalidFilter)).toThrow('Unable to create filter comparison for {"ONE":"one"}.');
        });
        it('should convert and filters to filter class', () => {
            const filterObject = {
                and: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.and[0]).toBeInstanceOf(TestGraphQLFilter);
        });
        it('should convert or filters to filter class', () => {
            const filterObject = {
                or: [{ stringField: { eq: 'foo' } }],
            };
            const filterInstance = (0, class_transformer_1.plainToClass)(TestDtoFilter, filterObject);
            expect(filterInstance.or[0]).toBeInstanceOf(TestGraphQLFilter);
        });
    });
});
//# sourceMappingURL=filter.type.spec.js.map