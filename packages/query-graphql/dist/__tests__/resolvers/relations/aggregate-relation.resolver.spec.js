"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
describe('AggregateRelationsResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, relations_1.AggregateRelationsResolver)(__fixtures__1.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
    it('should not add read methods if one and many are empty', () => expectResolverSDL());
    describe('aggregate', () => {
        it('should use the object type name', () => expectResolverSDL({ enableAggregate: true, many: { relations: { DTO: __fixtures__1.TestRelationDTO } } }));
        it('should use the dtoName if provided', () => expectResolverSDL({ enableAggregate: true, many: { relations: { DTO: __fixtures__1.TestRelationDTO, dtoName: 'Test' } } }));
        it('should not add read methods if enableAggregate is not true', () => expectResolverSDL({ many: { relations: { DTO: __fixtures__1.TestRelationDTO, disableRead: true } } }));
        describe('aggregate query', () => {
            it('should call the service aggregateRelations with the provided dto', async () => {
                let TestResolver = class TestResolver extends (0, relations_1.AggregateRelationsResolver)(__fixtures__1.TestResolverDTO, {
                    enableAggregate: true,
                    one: { relation: { DTO: __fixtures__1.TestRelationDTO }, custom: { DTO: __fixtures__1.TestRelationDTO, relationName: 'other' } },
                    many: { relations: { DTO: __fixtures__1.TestRelationDTO }, customs: { DTO: __fixtures__1.TestRelationDTO, relationName: 'others' } },
                }) {
                    constructor(service) {
                        super(service);
                    }
                };
                TestResolver = (0, tslib_1.__decorate)([
                    (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
                    (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
                ], TestResolver);
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const dto = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const filter = { id: { eq: 'id-2' } };
                const aggregateQuery = {
                    count: ['id'],
                    sum: ['testResolverId'],
                };
                const output = [
                    {
                        count: { id: 10 },
                        sum: { testResolverId: 100 },
                    },
                ];
                (0, ts_mockito_1.when)(mockService.aggregateRelations(__fixtures__1.TestRelationDTO, 'relations', (0, ts_mockito_1.deepEqual)([dto]), (0, ts_mockito_1.objectContaining)(filter), (0, ts_mockito_1.objectContaining)(aggregateQuery))).thenResolve(new Map([[dto, output]]));
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.aggregateRelations(dto, { filter }, aggregateQuery, {});
                return expect(result).toEqual(output);
            });
        });
    });
});
//# sourceMappingURL=aggregate-relation.resolver.spec.js.map