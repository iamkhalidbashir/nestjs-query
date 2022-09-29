"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../../src");
const sorting_type_1 = require("../../../src/types/query/sorting.type");
const __fixtures__1 = require("../../__fixtures__");
describe('SortingType', () => {
    let BaseType = class BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], BaseType.prototype, "id", void 0);
    BaseType = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], BaseType);
    let TestSort = class TestSort extends BaseType {
    };
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", String)
    ], TestSort.prototype, "stringField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Number)
    ], TestSort.prototype, "numberField", void 0);
    (0, tslib_1.__decorate)([
        (0, src_1.FilterableField)(),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], TestSort.prototype, "boolField", void 0);
    TestSort = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)()
    ], TestSort);
    it('should create the correct graphql schema for sorting type', async () => {
        let Sorting = class Sorting extends (0, sorting_type_1.getOrCreateSortType)(TestSort) {
        };
        Sorting = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], Sorting);
        let SortingTypeSpec = class SortingTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [Sorting]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], SortingTypeSpec.prototype, "test", null);
        SortingTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], SortingTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([SortingTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('should throw an error if the class is not annotated with @ObjectType', () => {
        class BadTestSort {
        }
        expect(() => (0, sorting_type_1.getOrCreateSortType)(BadTestSort)).toThrow('Unable to make SortType. Ensure BadTestSort is annotated with @nestjs/graphql @ObjectType');
    });
    it('should throw an error if no fields are found', () => {
        let BadTestSort = class BadTestSort {
        };
        BadTestSort = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)()
        ], BadTestSort);
        expect(() => (0, sorting_type_1.getOrCreateSortType)(BadTestSort)).toThrow('No fields found to create SortType for BadTestSort. Ensure fields are annotated with @FilterableField');
    });
});
//# sourceMappingURL=sorting.type.spec.js.map