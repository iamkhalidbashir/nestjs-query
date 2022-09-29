"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const createResolver = (0, tslib_1.__importStar)(require("../../src/resolvers/create.resolver"));
const deleteResolver = (0, tslib_1.__importStar)(require("../../src/resolvers/delete.resolver"));
const readResolver = (0, tslib_1.__importStar)(require("../../src/resolvers/read.resolver"));
const updateResolver = (0, tslib_1.__importStar)(require("../../src/resolvers/update.resolver"));
describe('CrudResolver', () => {
    const creatableSpy = jest.spyOn(createResolver, 'Creatable');
    const readableSpy = jest.spyOn(readResolver, 'Readable');
    const updateableSpy = jest.spyOn(updateResolver, 'Updateable');
    const deleteResolverSpy = jest.spyOn(deleteResolver, 'DeleteResolver');
    beforeEach(() => jest.clearAllMocks());
    let TestResolverDTO = class TestResolverDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.ID),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestResolverDTO.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestResolverDTO.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestResolverDTO.prototype, "otherField", void 0);
    TestResolverDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestResolverDTO);
    let CreateTestResolverDTO = class CreateTestResolverDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], CreateTestResolverDTO.prototype, "stringField", void 0);
    CreateTestResolverDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], CreateTestResolverDTO);
    let UpdateTestResolverDTO = class UpdateTestResolverDTO {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], UpdateTestResolverDTO.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], UpdateTestResolverDTO.prototype, "otherField", void 0);
    UpdateTestResolverDTO = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], UpdateTestResolverDTO);
    it('should create an crud resolver for the DTO class', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO);
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
    it('should pass the provided CreateDTOClass to the CreateResolver', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO, { CreateDTOClass: CreateTestResolverDTO });
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, { CreateDTOClass: CreateTestResolverDTO });
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
    it('should mixin the CreateDTOClass to the CreateResolver options', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO, { CreateDTOClass: CreateTestResolverDTO, create: { guards: [] } });
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, { CreateDTOClass: CreateTestResolverDTO, guards: [] });
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
    it('should pass the provided UpdateDTOClass to the UpdateResolver', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO, { UpdateDTOClass: UpdateTestResolverDTO });
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, { UpdateDTOClass: UpdateTestResolverDTO });
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
    it('should mixin the provided UpdateDTOClass to the UpdateResolver options', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO, { UpdateDTOClass: UpdateTestResolverDTO, update: { guards: [] } });
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, { UpdateDTOClass: UpdateTestResolverDTO, guards: [] });
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
    it('should pass the provided pagingStrategy to the ReadResolver', () => {
        (0, src_1.CRUDResolver)(TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.OFFSET });
        expect(creatableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(creatableSpy).toHaveBeenCalledTimes(1);
        expect(readableSpy).toHaveBeenCalledWith(TestResolverDTO, { pagingStrategy: src_1.PagingStrategies.OFFSET });
        expect(readableSpy).toHaveBeenCalledTimes(1);
        expect(updateableSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(updateableSpy).toHaveBeenCalledTimes(1);
        expect(deleteResolverSpy).toHaveBeenCalledWith(TestResolverDTO, {});
        expect(deleteResolverSpy).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=crud.resolver.spec.js.map