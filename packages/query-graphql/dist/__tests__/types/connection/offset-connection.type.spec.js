"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
const connection_1 = require("../../../src/types/connection");
const paging_1 = require("../../../src/types/query/paging");
describe('OffsetConnectionType', () => {
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
    const createPage = (paging) => (0, class_transformer_1.plainToClass)((0, paging_1.getOrCreateOffsetPagingType)(), paging);
    const createTestDTO = (index) => ({
        stringField: `foo${index}`,
        numberField: index,
        boolField: index % 2 === 0,
    });
    it('should create the connection SDL', async () => {
        const TestConnection = (0, connection_1.getOrCreateOffsetConnectionType)(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET });
        let TestOffsetConnectionTypeResolver = class TestOffsetConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => TestConnection),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestOffsetConnectionTypeResolver.prototype, "test", null);
        TestOffsetConnectionTypeResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestOffsetConnectionTypeResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestOffsetConnectionTypeResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should create the connection SDL with totalCount if enabled', async () => {
        const TestConnectionWithTotalCount = (0, connection_1.getOrCreateOffsetConnectionType)(TestTotalCountDto, {
            pagingStrategy: src_1.PagingStrategies.OFFSET,
            enableTotalCount: true,
        });
        let TestOffsetConnectionTypeResolver = class TestOffsetConnectionTypeResolver {
            test() {
                return undefined;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => TestConnectionWithTotalCount),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestOffsetConnectionTypeResolver.prototype, "test", null);
        TestOffsetConnectionTypeResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], TestOffsetConnectionTypeResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestOffsetConnectionTypeResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should throw an error if the object is not registered with @nestjs/graphql', () => {
        class TestBadDto {
        }
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(),
            (0, tslib_1.__metadata)("design:type", String)
        ], TestBadDto.prototype, "stringField", void 0);
        expect(() => (0, connection_1.getOrCreateOffsetConnectionType)(TestBadDto, { pagingStrategy: src_1.PagingStrategies.OFFSET })).toThrow('Unable to make OffsetConnectionType. Ensure TestBadDto is annotated with @nestjs/graphql @ObjectType');
    });
    describe('limit offset offset connection', () => {
        const TestConnection = (0, connection_1.getOrCreateOffsetConnectionType)(TestDto, { pagingStrategy: src_1.PagingStrategies.OFFSET });
        it('should create an empty connection when created with new', () => {
            expect(new TestConnection()).toEqual({
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                nodes: [],
                totalCountFn: expect.any(Function),
            });
        });
        describe('.createFromPromise', () => {
            it('should create a connections response with an empty query', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, {});
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    nodes: [],
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
                await TestConnection.createFromPromise(queryMany, {
                    search: 'searchString',
                    paging: createPage({ limit: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({ search: 'searchString', paging: { limit: 3, offset: 0 } });
            });
            it('should create a connections response with an empty paging', async () => {
                const queryMany = jest.fn();
                const response = await TestConnection.createFromPromise(queryMany, { paging: {} });
                expect(queryMany).toHaveBeenCalledTimes(0);
                expect(response).toEqual({
                    nodes: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            describe('with limit', () => {
                it('should return hasNextPage and hasPreviousPage false when there are the exact number of records', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ limit: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        nodes: dtos,
                        pageInfo: {
                            hasNextPage: false,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasNextPage true and hasPreviousPage false when the number of records more than the limit and offset == 0', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, { paging: createPage({ limit: 2 }) });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                    expect(response).toEqual({
                        nodes: [dtos[0], dtos[1]],
                        pageInfo: {
                            hasNextPage: true,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            describe('with offset', () => {
                it('should return hasPreviousPage false if offset == 0', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ limit: 1, offset: 0 }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 2, offset: 0 } });
                    expect(response).toEqual({
                        nodes: dtos,
                        pageInfo: {
                            hasNextPage: false,
                            hasPreviousPage: false,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
                it('should return hasPreviousPage true if offset > 0', async () => {
                    const queryMany = jest.fn();
                    const dtos = [createTestDTO(1), createTestDTO(2), createTestDTO(3)];
                    queryMany.mockResolvedValueOnce([...dtos]);
                    const response = await TestConnection.createFromPromise(queryMany, {
                        paging: createPage({ limit: 2, offset: 1 }),
                    });
                    expect(queryMany).toHaveBeenCalledTimes(1);
                    expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 1 } });
                    expect(response).toEqual({
                        nodes: [dtos[0], dtos[1]],
                        pageInfo: {
                            hasNextPage: true,
                            hasPreviousPage: true,
                        },
                        totalCountFn: expect.any(Function),
                    });
                });
            });
            it('should create an empty connection', async () => {
                const queryMany = jest.fn();
                queryMany.mockResolvedValueOnce([]);
                const response = await TestConnection.createFromPromise(queryMany, {
                    paging: createPage({ limit: 2 }),
                });
                expect(queryMany).toHaveBeenCalledTimes(1);
                expect(queryMany).toHaveBeenCalledWith({ paging: { limit: 3, offset: 0 } });
                expect(response).toEqual({
                    nodes: [],
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
//# sourceMappingURL=offset-connection.type.spec.js.map