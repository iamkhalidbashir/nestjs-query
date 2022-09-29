"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const aggregate_resolver_1 = require("../../src/resolvers/aggregate.resolver");
const __fixtures__1 = require("../__fixtures__");
describe('AggregateResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, aggregate_resolver_1.AggregateResolver)(__fixtures__1.TestResolverDTO, opts) {
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
    it('should create a AggregateResolver for the DTO', () => expectResolverSDL({ enabled: true }));
    it('should not expose read methods if not enabled', () => expectResolverSDL());
    describe('#aggregate', () => {
        let TestResolver = class TestResolver extends (0, aggregate_resolver_1.AggregateResolver)(__fixtures__1.TestResolverDTO, { enabled: true }) {
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
            const aggregateQuery = { count: ['id'] };
            const output = [
                {
                    count: { id: 10 },
                },
            ];
            (0, ts_mockito_1.when)(mockService.aggregate((0, ts_mockito_1.objectContaining)(input.filter), (0, ts_mockito_1.deepEqual)(aggregateQuery))).thenResolve(output);
            const result = await resolver.aggregate(input, aggregateQuery);
            return expect(result).toEqual(output);
        });
    });
});
//# sourceMappingURL=aggregate.resolver.spec.js.map