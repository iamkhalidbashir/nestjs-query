"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const src_1 = require("../../../src");
const __fixtures__1 = require("../../__fixtures__");
describe('FederationResolver', () => {
    const generateSDL = (DTOClass) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.FederationResolver)(DTOClass) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => DTOClass),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", Object)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => DTOClass)
        ], TestSDLResolver);
        return (0, __fixtures__1.generateSchema)([TestSDLResolver]);
    };
    let TestFederatedDTO = class TestFederatedDTO extends __fixtures__1.TestResolverDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.ID),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestFederatedDTO.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestFederatedDTO.prototype, "stringField", void 0);
    TestFederatedDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('TestFederated'),
        (0, src_1.Relation)('relation', () => __fixtures__1.TestRelationDTO),
        (0, src_1.Relation)('custom', () => __fixtures__1.TestRelationDTO, { relationName: 'other' }),
        (0, src_1.UnPagedRelation)('unPagedRelations', () => __fixtures__1.TestRelationDTO),
        (0, src_1.OffsetConnection)('relationOffsetConnection', () => __fixtures__1.TestRelationDTO),
        (0, src_1.CursorConnection)('relationCursorConnection', () => __fixtures__1.TestRelationDTO)
    ], TestFederatedDTO);
    let TestResolver = class TestResolver extends (0, src_1.FederationResolver)(TestFederatedDTO) {
        constructor(service) {
            super(service);
        }
    };
    TestResolver = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => TestFederatedDTO),
        (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
    ], TestResolver);
    it('should not add federation methods if one and many are empty', async () => {
        const schema = await generateSDL(__fixtures__1.TestResolverDTO);
        expect(schema).toMatchSnapshot();
    });
    it('use the defined relations', async () => {
        const schema = await generateSDL(TestFederatedDTO);
        expect(schema).toMatchSnapshot();
    });
    describe('one', () => {
        describe('one relation', () => {
            it('should call the service findRelation with the provided dto', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver, TestFederatedDTO);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const output = {
                    id: 'id-2',
                    testResolverId: dto.id,
                };
                (0, ts_mockito_1.when)(mockService.findRelation(__fixtures__1.TestRelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.deepEqual)({ filter: undefined }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.findRelation(dto, {});
                return expect(result).toEqual(output);
            });
            it('should call the service findRelation with the provided dto and correct relation name', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver, TestFederatedDTO);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const output = {
                    id: 'id-2',
                    testResolverId: dto.id,
                };
                (0, ts_mockito_1.when)(mockService.findRelation(__fixtures__1.TestRelationDTO, 'other', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.deepEqual)({ filter: undefined }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.findCustom(dto, {});
                return expect(result).toEqual(output);
            });
        });
    });
    describe('many - connection', () => {
        describe('with cursor paging strategy', () => {
            it('should call the service findRelation with the provided dto', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver, TestFederatedDTO);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const query = {
                    filter: { id: { eq: 'id-2' } },
                    paging: { first: 1 },
                };
                const output = [
                    {
                        id: 'id-2',
                        testResolverId: dto.id,
                    },
                ];
                (0, ts_mockito_1.when)(mockService.queryRelations(__fixtures__1.TestRelationDTO, 'relationCursorConnections', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.objectContaining)({ ...query, paging: { limit: 2, offset: 0 } }))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.queryRelationCursorConnections(dto, query, {});
                return expect(result).toEqual({
                    edges: [
                        {
                            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                            node: {
                                id: output[0].id,
                                testResolverId: dto.id,
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
        });
    });
    describe('with offset paging strategy', () => {
        it('should call the service findRelation with the provided dto', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver, TestFederatedDTO);
            const dto = {
                id: 'id-1',
                stringField: 'foo',
            };
            const query = {
                filter: { id: { eq: 'id-2' } },
                paging: { limit: 1 },
            };
            const output = [
                {
                    id: 'id-2',
                    testResolverId: dto.id,
                },
            ];
            (0, ts_mockito_1.when)(mockService.queryRelations(__fixtures__1.TestRelationDTO, 'relationOffsetConnections', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.objectContaining)({ ...query, paging: { limit: 2 } }))).thenResolve(new Map([[dto, output]]));
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.queryRelationOffsetConnections(dto, query, {});
            return expect(result).toEqual({
                nodes: output,
                pageInfo: { hasNextPage: false, hasPreviousPage: false },
                totalCountFn: expect.any(Function),
            });
        });
    });
    describe('with no paging strategy', () => {
        it('should call the service findRelation with the provided dto', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver, TestFederatedDTO);
            const dto = {
                id: 'id-1',
                stringField: 'foo',
            };
            const query = {
                filter: { id: { eq: 'id-2' } },
                paging: { limit: 1 },
            };
            const output = [
                {
                    id: 'id-2',
                    testResolverId: dto.id,
                },
            ];
            (0, ts_mockito_1.when)(mockService.queryRelations(__fixtures__1.TestRelationDTO, 'unPagedRelations', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.objectContaining)({ filter: query.filter }))).thenResolve(new Map([[dto, output]]));
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.queryUnPagedRelations(dto, query, {});
            return expect(result).toEqual(output);
        });
    });
});
//# sourceMappingURL=federation.resolver.spec.js.map