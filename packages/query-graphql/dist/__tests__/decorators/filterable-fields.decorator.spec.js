"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nestjsGraphQL = (0, tslib_1.__importStar)(require("@nestjs/graphql"));
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
const { Float, ObjectType, Field, Int } = nestjsGraphQL;
describe('FilterableField decorator', () => {
    const fieldSpy = jest.spyOn(nestjsGraphQL, 'Field');
    beforeAll(() => jest.clearAllMocks());
    it('should store metadata', () => {
        const floatReturnFunc = () => Float;
        let TestDto = class TestDto {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)(),
            (0, tslib_1.__metadata)("design:type", String)
        ], TestDto.prototype, "stringField", void 0);
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)({ nullable: true }),
            (0, tslib_1.__metadata)("design:type", String)
        ], TestDto.prototype, "stringOptionalField", void 0);
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)(floatReturnFunc, { nullable: true }),
            (0, tslib_1.__metadata)("design:type", Number)
        ], TestDto.prototype, "floatField", void 0);
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)(undefined, { nullable: true }),
            (0, tslib_1.__metadata)("design:type", Number)
        ], TestDto.prototype, "numberField", void 0);
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)({ filterOnly: true }),
            (0, tslib_1.__metadata)("design:type", String)
        ], TestDto.prototype, "filterOnlyField", void 0);
        TestDto = (0, tslib_1.__decorate)([
            ObjectType('test')
        ], TestDto);
        const fields = (0, decorators_1.getFilterableFields)(TestDto);
        expect(fields).toMatchObject([
            { propertyName: 'stringField', target: String, advancedOptions: undefined, returnTypeFunc: undefined },
            {
                propertyName: 'stringOptionalField',
                target: String,
                advancedOptions: { nullable: true },
                returnTypeFunc: undefined,
            },
            {
                propertyName: 'floatField',
                target: Number,
                advancedOptions: { nullable: true },
                returnTypeFunc: floatReturnFunc,
            },
            { propertyName: 'numberField', target: Number, advancedOptions: { nullable: true }, returnTypeFunc: undefined },
            {
                propertyName: 'filterOnlyField',
                target: String,
                advancedOptions: { filterOnly: true },
                returnTypeFunc: undefined,
            },
        ]);
        expect(fieldSpy).toHaveBeenCalledTimes(4);
        expect(fieldSpy).toHaveBeenNthCalledWith(1);
        expect(fieldSpy).toHaveBeenNthCalledWith(2, { nullable: true });
        expect(fieldSpy).toHaveBeenNthCalledWith(3, floatReturnFunc, { nullable: true });
        expect(fieldSpy).toHaveBeenNthCalledWith(4, { nullable: true });
    });
    describe('getFilterableObjectFields', () => {
        let BaseType = class BaseType {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)(() => Int),
            (0, tslib_1.__metadata)("design:type", Number)
        ], BaseType.prototype, "id", void 0);
        (0, tslib_1.__decorate)([
            Field(),
            (0, tslib_1.__metadata)("design:type", Number)
        ], BaseType.prototype, "referenceId", void 0);
        BaseType = (0, tslib_1.__decorate)([
            ObjectType({ isAbstract: true })
        ], BaseType);
        let ImplementingClass = class ImplementingClass extends BaseType {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)(),
            (0, tslib_1.__metadata)("design:type", Boolean)
        ], ImplementingClass.prototype, "implemented", void 0);
        ImplementingClass = (0, tslib_1.__decorate)([
            ObjectType()
        ], ImplementingClass);
        let DuplicateImplementor = class DuplicateImplementor extends ImplementingClass {
        };
        (0, tslib_1.__decorate)([
            (0, src_1.FilterableField)({ name: 'test' }),
            (0, tslib_1.__metadata)("design:type", Number)
        ], DuplicateImplementor.prototype, "id", void 0);
        (0, tslib_1.__decorate)([
            Field(),
            (0, tslib_1.__metadata)("design:type", Number)
        ], DuplicateImplementor.prototype, "someReferenceId", void 0);
        DuplicateImplementor = (0, tslib_1.__decorate)([
            ObjectType()
        ], DuplicateImplementor);
        it('should return filterable fields for a type', () => {
            expect((0, decorators_1.getFilterableFields)(BaseType)).toEqual([
                { propertyName: 'id', target: Number, returnTypeFunc: expect.any(Function) },
            ]);
        });
        it('should return inherited filterable fields for a type', () => {
            expect((0, decorators_1.getFilterableFields)(ImplementingClass)).toEqual([
                { propertyName: 'id', target: Number, returnTypeFunc: expect.any(Function) },
                { propertyName: 'implemented', target: Boolean },
            ]);
        });
        it('should exclude duplicate fields inherited filterable fields for a type', () => {
            expect((0, decorators_1.getFilterableFields)(DuplicateImplementor)).toEqual([
                { propertyName: 'implemented', target: Boolean },
                { propertyName: 'id', target: Number, advancedOptions: { name: 'test' } },
            ]);
        });
    });
});
//# sourceMappingURL=filterable-fields.decorator.spec.js.map