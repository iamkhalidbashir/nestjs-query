"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
let TestResolver = class TestResolver extends (0, relations_1.ReferencesRelationsResolver)(__fixtures__1.TestResolverDTO, {
    reference: { DTO: __fixtures__1.TestRelationDTO, keys: { id: 'stringField' } },
}) {
    constructor(service) {
        super(service);
    }
};
TestResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
    (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService])
], TestResolver);
describe('ReferencesRelationMixin', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, relations_1.ReferencesRelationsResolver)(__fixtures__1.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
    it('should not add reference methods if references empty', () => expectResolverSDL());
    it('should use the add the reference if provided', () => expectResolverSDL({ reference: { DTO: __fixtures__1.TestRelationDTO, keys: { id: 'stringField' }, dtoName: 'Test' } }));
    it('should set the field to nullable if set to true', () => expectResolverSDL({ reference: { DTO: __fixtures__1.TestRelationDTO, keys: { id: 'stringField' }, nullable: true } }));
    it('should return a references type from the passed in dto', async () => {
        const { resolver } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
        const dto = {
            id: 'id-1',
            stringField: 'reference-id-1',
        };
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result = await resolver.referenceReference(dto);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        return expect(result).toEqual({ __typename: 'Reference', id: dto.stringField });
    });
});
//# sourceMappingURL=references-relation.resolver.spec.js.map