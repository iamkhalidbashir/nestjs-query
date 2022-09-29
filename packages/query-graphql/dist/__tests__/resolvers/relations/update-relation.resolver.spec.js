"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const relations_1 = require("../../../src/resolvers/relations");
const __fixtures__1 = require("../../__fixtures__");
let TestResolver = class TestResolver extends (0, relations_1.UpdateRelationsResolver)(__fixtures__1.TestResolverDTO, {
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
describe('UpdateRelationsResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, relations_1.UpdateRelationsResolver)(__fixtures__1.TestResolverDTO, opts !== null && opts !== void 0 ? opts : {}) {
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
    it('should not add update methods if one and many are empty', () => expectResolverSDL());
    describe('one', () => {
        it('should use the object type name', () => expectResolverSDL({ one: { relation: { DTO: __fixtures__1.TestRelationDTO } } }));
        it('should use the dtoName if provided', () => expectResolverSDL({ one: { relation: { DTO: __fixtures__1.TestRelationDTO, dtoName: 'Test' } } }));
        it('should not add update one methods if disableRead is true', () => expectResolverSDL({ one: { relation: { DTO: __fixtures__1.TestRelationDTO, disableUpdate: true } } }));
        it('should call the service findRelation with the provided dto and correct relation name', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const input = {
                id: 'record-id',
                relationId: 'relation-id',
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.setRelation('relation', input.id, input.relationId, undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.setRelationOnTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service findRelation with the provided dto and custom relation name', async () => {
            const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
            const input = {
                id: 'record-id',
                relationId: 'relation-id',
            };
            const output = {
                id: 'record-id',
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.setRelation('other', input.id, input.relationId, undefined)).thenResolve(output);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const result = await resolver.setCustomOnTestResolverDTO({ input });
            return expect(result).toEqual(output);
        });
    });
    describe('many', () => {
        it('should use the object type name', () => expectResolverSDL({ many: { relations: { DTO: __fixtures__1.TestRelationDTO } } }));
        it('should use the dtoName if provided', () => expectResolverSDL({ many: { relations: { DTO: __fixtures__1.TestRelationDTO, dtoName: 'Test' } } }));
        it('should not add update many methods if disableUpdate is true', () => expectResolverSDL({ many: { relations: { DTO: __fixtures__1.TestRelationDTO, disableUpdate: true } } }));
        describe('add relations', () => {
            it('should call the service addRelations with the dto id and relationIds', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    id: 'id-1',
                    relationIds: ['relation-id-1', 'relation-id-2'],
                };
                const output = {
                    id: 'record-id',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.addRelations('relations', input.id, (0, ts_mockito_1.deepEqual)(input.relationIds), undefined)).thenResolve(output);
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.addRelationsToTestResolverDTO({ input });
                return expect(result).toEqual(output);
            });
            it('should call the service addRelations with the custom dto name dto id and relationIds', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    id: 'id-1',
                    relationIds: ['relation-id-1', 'relation-id-2'],
                };
                const output = {
                    id: 'record-id',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.addRelations('others', input.id, (0, ts_mockito_1.deepEqual)(input.relationIds), undefined)).thenResolve(output);
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.addCustomsToTestResolverDTO({ input });
                return expect(result).toEqual(output);
            });
        });
        describe('set relations', () => {
            it('should call the service setRelations with the dto id and relationIds', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    id: 'id-1',
                    relationIds: ['relation-id-1', 'relation-id-2'],
                };
                const output = {
                    id: 'record-id',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.setRelations('relations', input.id, (0, ts_mockito_1.deepEqual)(input.relationIds), undefined)).thenResolve(output);
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.setRelationsOnTestResolverDTO({ input });
                return expect(result).toEqual(output);
            });
            it('should call the service setRelations with the dto id and an empty relationIds', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    id: 'id-1',
                    relationIds: [],
                };
                const output = {
                    id: 'record-id',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.setRelations('relations', input.id, (0, ts_mockito_1.deepEqual)(input.relationIds), undefined)).thenResolve(output);
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.setRelationsOnTestResolverDTO({ input });
                return expect(result).toEqual(output);
            });
            it('should call the service setRelations with the custom dto name dto id and relationIds', async () => {
                const { resolver, mockService } = await (0, __fixtures__1.createResolverFromNest)(TestResolver);
                const input = {
                    id: 'id-1',
                    relationIds: ['relation-id-1', 'relation-id-2'],
                };
                const output = {
                    id: 'record-id',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.setRelations('others', input.id, (0, ts_mockito_1.deepEqual)(input.relationIds), undefined)).thenResolve(output);
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                const result = await resolver.setCustomsOnTestResolverDTO({ input });
                return expect(result).toEqual(output);
            });
        });
    });
});
//# sourceMappingURL=update-relation.resolver.spec.js.map