"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
const reference_decorator_1 = require("../../src/decorators/reference.decorator");
describe('@Reference decorator', () => {
    let SomeReference = class SomeReference {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], SomeReference.prototype, "id", void 0);
    SomeReference = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], SomeReference);
    let BaseType = class BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(() => graphql_1.Int),
        (0, tslib_1.__metadata)("design:type", Number)
    ], BaseType.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], BaseType.prototype, "referenceId", void 0);
    BaseType = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)({ isAbstract: true }),
        (0, src_1.Reference)('testReference', () => SomeReference, { id: 'referenceId' })
    ], BaseType);
    let ImplementingClass = class ImplementingClass extends BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], ImplementingClass.prototype, "implemented", void 0);
    ImplementingClass = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(),
        (0, src_1.Reference)('implementedReference', () => SomeReference, { id: 'referenceId' })
    ], ImplementingClass);
    let DuplicateImplementor = class DuplicateImplementor extends ImplementingClass {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)({ name: 'test' }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], DuplicateImplementor.prototype, "id", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], DuplicateImplementor.prototype, "someReferenceId", void 0);
    DuplicateImplementor = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)(),
        (0, src_1.Reference)('implementedReference', () => SomeReference, { id: 'someReferenceId' })
    ], DuplicateImplementor);
    describe('getReferences', () => {
        it('should return references for a type', () => {
            expect((0, reference_decorator_1.getReferences)(BaseType)).toEqual({
                testReference: { DTO: SomeReference, keys: { id: 'referenceId' } },
            });
        });
        it('should return inherited references fields for a type', () => {
            expect((0, reference_decorator_1.getReferences)(ImplementingClass)).toEqual({
                testReference: { DTO: SomeReference, keys: { id: 'referenceId' } },
                implementedReference: { DTO: SomeReference, keys: { id: 'referenceId' } },
            });
        });
        it('should exclude duplicate inherited references fields for a type', () => {
            expect((0, reference_decorator_1.getReferences)(DuplicateImplementor)).toEqual({
                testReference: { DTO: SomeReference, keys: { id: 'referenceId' } },
                implementedReference: { DTO: SomeReference, keys: { id: 'someReferenceId' } },
            });
        });
    });
});
//# sourceMappingURL=reference.decorator.spec.js.map