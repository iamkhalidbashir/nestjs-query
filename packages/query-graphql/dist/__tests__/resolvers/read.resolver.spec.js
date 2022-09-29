"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
describe('ReadResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO, opts) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", __fixtures__1.TestResolverDTO)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO)
        ], TestSDLResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestSDLResolver]);
        expect(schema).toMatchSnapshot();
    };
    it('should create a ReadResolver for the DTO', () => expectResolverSDL());
    it('should use the dtoName if provided', () => expectResolverSDL({ dtoName: 'Test' }));
    it('should use the one.name option for the findById if provided', () => expectResolverSDL({ one: { name: 'read_one_test' } }));
    it('should use the many.name option for the queryMany if provided', () => expectResolverSDL({ many: { name: 'read_many_test' } }));
    it('should not expose read methods if disabled', () => expectResolverSDL({ disabled: true }));
    describe('query many', () => {
        it('should not create a new type if the QueryArgs is supplied', () => {
            let CustomQueryArgs = class CustomQueryArgs extends (0, src_1.QueryArgsType)(__fixtures__1.TestResolverDTO) {
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomQueryArgs.prototype, "other", void 0);
            CustomQueryArgs = (0, tslib_1.__decorate)([
                (0, graphql_1.ArgsType)()
            ], CustomQueryArgs);
            return expectResolverSDL({ QueryArgs: CustomQueryArgs });
        });
        it('should use a connection if custom QueryArgs is a cursor', () => {
            let CustomQueryArgs = class CustomQueryArgs extends (0, src_1.QueryArgsType)(__fixtures__1.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.CURSOR }) {
            };
            CustomQueryArgs = (0, tslib_1.__decorate)([
                (0, graphql_1.ArgsType)()
            ], CustomQueryArgs);
            return expectResolverSDL({ QueryArgs: CustomQueryArgs });
        });
        it('should not use a connection if pagingStrategy is OFFSET', () => expectResolverSDL({ pagingStrategy: src_1.PagingStrategies.OFFSET }));
        it('should use an offset connection if custom QueryArgs is a limit offset', () => {
            let CustomQueryArgs = class CustomQueryArgs extends (0, src_1.QueryArgsType)(__fixtures__1.TestResolverDTO, {
                pagingStrategy: src_1.PagingStrategies.OFFSET,
                connectionName: 'TestResolverDTOConnection',
            }) {
            };
            CustomQueryArgs = (0, tslib_1.__decorate)([
                (0, graphql_1.ArgsType)()
            ], CustomQueryArgs);
            return expectResolverSDL({ QueryArgs: CustomQueryArgs });
        });
        it('should not expose query method if disabled', () => expectResolverSDL({ many: { disabled: true } }));
        describe('#queryMany cursor connection', () => {
            let TestResolver = class TestResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO) {
                constructor(service) {
                    super(service);
                }
            };
            TestResolver = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
                (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
            ], TestResolver);
            it('should call the service query with the provided input', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)({ ...input, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input);
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: 'id-1',
                                stringField: 'foo',
                            },
                        },
                    ],
                    pageInfo: {
                        endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        hasNextPage: false,
                        hasPreviousPage: false,
                        startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should merge the filter an auth filter if provided', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const authorizeFilter = { id: { eq: '1' } };
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)({ filter: { ...input.filter, ...authorizeFilter }, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, authorizeFilter);
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: 'id-1',
                                stringField: 'foo',
                            },
                        },
                    ],
                    pageInfo: {
                        endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                        hasNextPage: false,
                        hasPreviousPage: false,
                        startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                    },
                    totalCountFn: expect.any(Function),
                });
            });
            it('should call the service count', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)({ ...input, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input);
                (0, ts_mockito_1.when)(mockService.count((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(10);
                return expect(result.totalCount).resolves.toBe(10);
            });
            it('should call the service count with the provided input and auth filter', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const authorizeFilter = { id: { eq: '1' } };
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)({ filter: { ...input.filter, ...authorizeFilter }, paging: { limit: 2, offset: 0 } }))).thenResolve(output);
                const result = await resolver.queryMany(input, authorizeFilter);
                (0, ts_mockito_1.when)(mockService.count((0, ts_mockito_1.objectContaining)({ ...input.filter, ...authorizeFilter }))).thenResolve(10);
                return expect(result.totalCount).resolves.toBe(10);
            });
        });
        describe('queryMany array connection', () => {
            let TestResolver = class TestResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.OFFSET }) {
                constructor(service) {
                    super(service);
                }
            };
            TestResolver = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
                (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
            ], TestResolver);
            it('should call the service query with the provided input', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                    paging: { limit: 1 },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)({ ...input, paging: { limit: 2 } }))).thenResolve(output);
                const result = await resolver.queryMany(input);
                return expect(result).toEqual({
                    nodes: output,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                    totalCountFn: expect.any(Function),
                });
            });
        });
        describe('queryMany no paging connection', () => {
            let TestResolver = class TestResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.NONE }) {
                constructor(service) {
                    super(service);
                }
            };
            TestResolver = (0, tslib_1.__decorate)([
                (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
                (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
            ], TestResolver);
            it('should call the service query with the provided input', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    filter: {
                        stringField: { eq: 'foo' },
                    },
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.query((0, ts_mockito_1.objectContaining)(input))).thenResolve(output);
                const result = await resolver.queryMany(input);
                return expect(result).toEqual(output);
            });
        });
    });
    describe('#findById', () => {
        let TestResolver = class TestResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO) {
            constructor(service) {
                super(service);
            }
        };
        TestResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
        ], TestResolver);
        it('should not expose findById method if disabled', () => expectResolverSDL({ one: { disabled: true } }));
        it('should call the service findById with the provided input', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const input = { id: 'id-1' };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const context = {};
            (0, ts_mockito_1.when)(mockService.findById(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
            const result = await resolver.findById(input, context);
            return expect(result).toEqual(output);
        });
        it('should call the service findById with the provided input filter and authFilter', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const input = { id: 'id-1' };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const authorizeFilter = { stringField: { eq: 'foo' } };
            (0, ts_mockito_1.when)(mockService.findById(input.id, (0, ts_mockito_1.deepEqual)({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.findById(input, authorizeFilter);
            return expect(result).toEqual(output);
        });
    });
    it('should expose totalCount on cursor connections if enableTotalCount is true', async () => {
        let TestTotalCountSDLResolver = class TestTotalCountSDLResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO, { enableTotalCount: true }) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", __fixtures__1.TestResolverDTO)
        ], TestTotalCountSDLResolver.prototype, "test", null);
        TestTotalCountSDLResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO)
        ], TestTotalCountSDLResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestTotalCountSDLResolver]);
        expect(schema).toMatchSnapshot();
    });
    it('should expose totalCount on offset connections if enableTotalCount is true', async () => {
        let TestTotalCountSDLResolver = class TestTotalCountSDLResolver extends (0, src_1.ReadResolver)(__fixtures__1.TestResolverDTO, {
            pagingStrategy: src_1.PagingStrategies.OFFSET,
            enableTotalCount: true,
        }) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", __fixtures__1.TestResolverDTO)
        ], TestTotalCountSDLResolver.prototype, "test", null);
        TestTotalCountSDLResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO)
        ], TestTotalCountSDLResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestTotalCountSDLResolver]);
        expect(schema).toMatchSnapshot();
    });
});
//# sourceMappingURL=read.resolver.spec.js.map