"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const core_1 = require("@nestjs-query/core");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
const decorators_1 = require("../../../src/decorators");
const connection_1 = require("../../../src/types/connection");
const paging_1 = require("../../../src/types/query/paging");
describe('CursorConnectionType', () => {
    let TestDto = class TestDto {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestDto.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestDto.prototype, "numberField", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], TestDto.prototype, "boolField", void 0);
    TestDto = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('Test')
    ], TestDto);
    let TestTotalCountDto = class TestTotalCountDto {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestTotalCountDto.prototype, "stringField", void 0);
    TestTotalCountDto = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('TestTotalCount')
    ], TestTotalCountDto);
    const createPage = (paging) => (0, class_transformer_1.plainToClass)((0, paging_1.getOrCreateCursorPagingType)(), paging);
    const createTestDTO = (index) => ({
        stringField: `foo${index}`,
        numberField: index,
        boolField: index % 2 === 0,
    });
    it('should create the connection SDL', async () => {
        const TestConnection = (0, connection_1.getOrCreateCursorConnectionType)(TestDto, { pagingStrategy: src_1.PagingStrategies.CURSOR });
        let TestConnectionTypeResolver = class TestConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => TestConnection),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestConnectionTypeResolver.prototype, "test", null);
        TestConnectionTypeResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestConnectionTypeResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestConnectionTypeResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should create the connection SDL with totalCount if enabled', async () => {
        const TestConnectionWithTotalCount = (0, connection_1.getOrCreateCursorConnectionType)(TestTotalCountDto, {
            pagingStrategy: src_1.PagingStrategies.CURSOR,
            enableTotalCount: true,
        });
        let TestConnectionTypeResolver = class TestConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => TestConnectionWithTotalCount),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestConnectionTypeResolver.prototype, "test", null);
        TestConnectionTypeResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestConnectionTypeResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestConnectionTypeResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should throw an error if the object is not registered with @nestjs/graphql', () => {
        class TestBadDto {
        }
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(),
            (0, tslib_1.__metadata)("design:type", String)
        ], TestBadDto.prototype, "stringField", void 0);
        expect(() => (0, connection_1.getOrCreateCursorConnectionType)(TestBadDto, { pagingStrategy: src_1.PagingStrategies.CURSOR })).toThrow('Unable to make ConnectionType. Ensure TestBadDto is annotated with @nestjs/graphql @ObjectType');
    });
    describe('limit offset offset cursor connection', () => {
        const TestConnection = (0, connection_1.getOrCreateCursorConnectionType)(TestDto, { pagingStrategy: src_1.PagingStrategies.CURSOR });
        it('should create an empty connection when created with new', () => {
            expect(new TestConnection()).toEqual({
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                edges: [],
                totalCountFn: expect.any(Function),
            });
        });
        describe('.createFromPromise', () => {
            it('should create a connections response with an empty query', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, {});
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should pass additional query params to queryMany', async () => {
                const queryMany = jest.fn();
                const dtos = [createTestDTO(1), createTestDTO(2)];
                queryMany.mockResolvedValueOnce([...dtos]);
                await TestConnection.createFromPromise(queryMany, { search: 'searchString', paging: createPage({ first: 2 }) });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({ search: 'searchString', paging: { limit: 3, offset: 0 } });
            });
            it('should create a connections response with an empty paging', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, { paging: {} });
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            describe('with first', () => {
                it('should return hasNextPage and hasPreviousPage false when there are the exact number of records', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                            hasNextPage: false,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasNextPage true and hasPreviousPage false when the number of records more than the first', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            describe('with last', () => {
                it("should return hasPreviousPage false if paging backwards and we're on the first page", async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ last: 2, before: 'YXJyYXljb25uZWN0aW9uOjE=' }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 1, offset: 0 } });
                    expect(response).toEqual({
                        edges: [{ cursor: 'YXJyYXljb25uZWN0aW9uOjA=', node: dtos[0] }],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasPreviousPage true if paging backwards and there is an additional node', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ last: 2, before: 'YXJyYXljb25uZWN0aW9uOjM=' }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        edges: [
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjE=', node: dtos[1] },
                            { cursor: 'YXJyYXljb25uZWN0aW9uOjI=', node: dtos[2] },
                        ],
                        pageInfo: {
                            endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                            hasNextPage: true,
                            hasPreviousPage: true,
                            startCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            it('should create an empty connection', async () => {
                const queryMany = jest.fn();
                queryMany.mockResolvedValueOnce([]);
                const response = await TestConnection.createFromPromise(queryMany, {
                    paging: createPage({ first: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
        });
    });
    describe('keyset connection', () => {
        let TestKeySetDTO = class TestKeySetDTO extends TestDto {
        };
        TestKeySetDTO = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, decorators_1.KeySet)(['stringField'])
        ], TestKeySetDTO);
        function getConnectionType() {
            return (0, connection_1.getOrCreateCursorConnectionType)(TestKeySetDTO, { pagingStrategy: src_1.PagingStrategies.CURSOR });
        }
        it('should create an empty connection when created with new', () => {
            const CT = getConnectionType();
            expect(new CT()).toEqual({
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                edges: [],
                totalCountFn: expect.any(Function),
            });
        });
        describe('.createFromPromise', () => {
            it('should create a connections response with an empty query', async () => {
                const queryMany = jest.fn();
                const response = await getConnectionType().createFromPromise(queryMany, {});
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should create a connections response with an empty paging', async () => {
                const queryMany = jest.fn();
                const response = await getConnectionType().createFromPromise(queryMany, { paging: {} });
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            describe('with first', () => {
                it('should return hasNextPage and hasPreviousPage false when there are the exact number of records', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: {},
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            hasNextPage: false,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasNextPage true and hasPreviousPage false when the number of records more than the first', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, { paging: createPage({ first: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: {},
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should fetch nodes after the cursor', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            first: 2,
                            after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { gt: 'foo1' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[0],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                node: dtos[1],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: true,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                describe('with additional filter', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                        queryMany.mockResolvedValueOnce([...dtos]);
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            paging: createPage({
                                first: 2,
                                after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: { and: [{ or: [{ and: [{ stringField: { gt: 'foo1' } }] }] }, { boolField: { is: true } }] },
                            paging: { limit: 3 },
                            sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC }],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                    node: dtos[0],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[1],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
                describe('with additional sorting', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(2), createTestDTO(3), createTestDTO(4)];
                        queryMany.mockResolvedValueOnce([...dtos]);
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            sorting: [{ field: 'boolField', direction: core_1.SortDirection.DESC }],
                            paging: createPage({
                                first: 2,
                                after: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: {
                                and: [
                                    {
                                        or: [
                                            { and: [{ boolField: { lt: false } }] },
                                            { and: [{ boolField: { eq: false } }, { stringField: { gt: 'foo1' } }] },
                                        ],
                                    },
                                    { boolField: { is: true } },
                                ],
                            },
                            paging: { limit: 3 },
                            sorting: [
                                { field: 'boolField', direction: core_1.SortDirection.DESC },
                                { field: 'stringField', direction: core_1.SortDirection.ASC },
                            ],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                    node: dtos[0],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[1],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
            });
            describe('with last', () => {
                it("should return hasPreviousPage false if paging backwards and we're on the first page", async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            last: 2,
                            before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { lt: 'foo2' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC, nulls: undefined }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                                node: dtos[0],
                            },
                        ],
                        pageInfo: {
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: false,
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28xIn1dfQ==',
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasPreviousPage true if paging backwards and there is an additional node', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos].reverse());
                    const response = await getConnectionType().createFromPromise(queryMany, {
                        paging: createPage({
                            last: 2,
                            before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb280In1dfQ==',
                        }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({
                        filter: { or: [{ and: [{ stringField: { lt: 'foo4' } }] }] },
                        paging: { limit: 3 },
                        sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC, nulls: undefined }],
                    });
                    expect(response).toEqual({
                        edges: [
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                node: dtos[1],
                            },
                            {
                                cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                node: dtos[2],
                            },
                        ],
                        pageInfo: {
                            startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                            endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                            hasNextPage: true,
                            hasPreviousPage: true,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                describe('with additional filter', () => {
                    it('should merge the cursor filter and query filter', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                        queryMany.mockResolvedValueOnce([...dtos].reverse());
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            paging: createPage({
                                last: 2,
                                before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb280In1dfQ==',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: { and: [{ or: [{ and: [{ stringField: { lt: 'foo4' } }] }] }, { boolField: { is: true } }] },
                            paging: { limit: 3 },
                            sorting: [{ field: 'stringField', direction: core_1.SortDirection.DESC }],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                    node: dtos[1],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[2],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28yIn1dfQ==',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
                describe('with additional sort', () => {
                    it('should merge the cursor sort', async () => {
                        const queryMany = jest.fn();
                        const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                        queryMany.mockResolvedValueOnce([...dtos].reverse());
                        const response = await getConnectionType().createFromPromise(queryMany, {
                            filter: { boolField: { is: true } },
                            sorting: [{ field: 'boolField', direction: core_1.SortDirection.DESC }],
                            paging: createPage({
                                last: 2,
                                before: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzQifV19',
                            }),
                        });
                        expect(queryMany).toHaveBeenCalledTimes(1);
                        expect(queryMany).toHaveBeenCalledWith({
                            filter: {
                                and: [
                                    {
                                        or: [
                                            { and: [{ boolField: { gt: true } }] },
                                            { and: [{ boolField: { eq: true } }, { stringField: { lt: 'foo4' } }] },
                                        ],
                                    },
                                    { boolField: { is: true } },
                                ],
                            },
                            paging: { limit: 3 },
                            sorting: [
                                { field: 'boolField', direction: core_1.SortDirection.ASC },
                                { field: 'stringField', direction: core_1.SortDirection.DESC },
                            ],
                        });
                        expect(response).toEqual({
                            edges: [
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                    node: dtos[1],
                                },
                                {
                                    cursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                    node: dtos[2],
                                },
                            ],
                            pageInfo: {
                                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjp0cnVlfSx7ImZpZWxkIjoic3RyaW5nRmllbGQiLCJ2YWx1ZSI6ImZvbzIifV19',
                                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImJvb2xGaWVsZCIsInZhbHVlIjpmYWxzZX0seyJmaWVsZCI6InN0cmluZ0ZpZWxkIiwidmFsdWUiOiJmb28zIn1dfQ==',
                                hasNextPage: true,
                                hasPreviousPage: true,
                            },
                            totalCountFn: expect.any(Function),
                        });
                    });
                });
            });
            it('should create an empty connection', async () => {
                const queryMany = jest.fn();
                queryMany.mockResolvedValueOnce([]);
                const response = await getConnectionType().createFromPromise(queryMany, {
                    paging: createPage({ first: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({
                    filter: {},
                    paging: { limit: 3 },
                    sorting: [{ field: 'stringField', direction: core_1.SortDirection.ASC, nulls: undefined }],
                });
                expect(response).toEqual({
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
        });
    });
});
//# sourceMappingURL=cursor-connection.type.spec.js.map