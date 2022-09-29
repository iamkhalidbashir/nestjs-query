"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const readRelations = (0, tslib_1.__importStar)(require("../../../src/resolvers/relations/read-relations.resolver"));
const referenceRelation = (0, tslib_1.__importStar)(require("../../../src/resolvers/relations/references-relation.resolver"));
const removeRelations = (0, tslib_1.__importStar)(require("../../../src/resolvers/relations/remove-relations.resolver"));
const updateRelations = (0, tslib_1.__importStar)(require("../../../src/resolvers/relations/update-relations.resolver"));
const resolver_interface_1 = require("../../../src/resolvers/resolver.interface");
describe('Relatable', () => {
    const referenceMixinSpy = jest.spyOn(referenceRelation, 'ReferencesRelationMixin');
    const readMixinSpy = jest.spyOn(readRelations, 'ReadRelationsMixin');
    const updateMixinSpy = jest.spyOn(updateRelations, 'UpdateRelationsMixin');
    const removeMixinSpy = jest.spyOn(removeRelations, 'RemoveRelationsMixin');
    let TestRelation = class TestRelation {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestRelation.prototype, "id", void 0);
    TestRelation = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestRelation);
    afterEach(() => jest.clearAllMocks());
    it('should call the mixins with the relations derived from decorators', () => {
        let Test = class Test {
        };
        Test = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.Relation)('testRelation', () => TestRelation),
            (0, src_1.CursorConnection)('testConnection', () => TestRelation)
        ], Test);
        (0, src_1.Relatable)(Test, {})(resolver_interface_1.BaseServiceResolver);
        const relations = {
            one: { testRelation: { DTO: TestRelation, allowFiltering: false } },
            many: { testConnection: { DTO: TestRelation, allowFiltering: false, pagingStrategy: src_1.PagingStrategies.CURSOR } },
        };
        expect(readMixinSpy).toHaveBeenCalledWith(Test, relations);
        expect(updateMixinSpy).toHaveBeenCalledWith(Test, relations);
        expect(removeMixinSpy).toHaveBeenCalledWith(Test, relations);
        expect(referenceMixinSpy).toHaveBeenCalledWith(Test, {});
    });
    it('should call the mixins with the references passed in', () => {
        let Test = class Test {
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(),
            (0, tslib_1.__metadata)("design:type", Number)
        ], Test.prototype, "relationId", void 0);
        Test = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(),
            (0, src_1.Reference)('testReference', () => TestRelation, { id: 'relationId' })
        ], Test);
        (0, src_1.Relatable)(Test, {})(resolver_interface_1.BaseServiceResolver);
        expect(readMixinSpy).toHaveBeenCalledWith(Test, {});
        expect(updateMixinSpy).toHaveBeenCalledWith(Test, {});
        expect(removeMixinSpy).toHaveBeenCalledWith(Test, {});
        expect(referenceMixinSpy).toHaveBeenCalledWith(Test, {
            testReference: { DTO: TestRelation, keys: { id: 'relationId' } },
        });
    });
});
//# sourceMappingURL=relations.resolver.spec.js.map