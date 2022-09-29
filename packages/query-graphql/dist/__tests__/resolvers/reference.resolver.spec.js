"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const __fixtures__1 = require("../__fixtures__");
let TestResolver = class TestResolver extends (0, src_1.ReferenceResolver)(__fixtures__1.TestResolverDTO, { key: 'id' }) {
    constructor(service) {
        super(service);
    }
};
TestResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
    (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
], TestResolver);
describe('ReferenceResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.ReferenceResolver)(__fixtures__1.TestResolverDTO, opts) {
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
    it('should create a new resolver with a resolveReference method', () => expectResolverSDL());
    it('should return the original resolver if key is not provided', () => {
        const TestReferenceResolver = (0, src_1.ReferenceResolver)(__fixtures__1.TestResolverDTO);
        return expect(TestReferenceResolver.prototype.resolveReference).toBeUndefined();
    });
    describe('#resolveReference', () => {
        it('should call the service getById with the provided input', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const id = 'id-1';
            const output = {
                id,
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.getById(id)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/naming-convention
            const result = await resolver.resolveReference({ __type: 'TestReference', id });
            return expect(result).toEqual(output);
        });
        it('should reject if the id is not found', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const id = 'id-1';
            const output = {
                id,
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.getById(id)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/naming-convention
            return expect(resolver.resolveReference({ __type: 'TestReference' })).rejects.toThrow('Unable to resolve reference, missing required key id for TestResolverDTO');
        });
    });
});
//# sourceMappingURL=reference.resolver.spec.js.map