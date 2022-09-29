"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const __fixtures__1 = require("../../__fixtures__");
const paging_1 = require("../../../src/types/query/paging");
describe('PagingType', () => {
    const CursorPaging = (0, paging_1.getOrCreateCursorPagingType)();
    it('should create the correct filter graphql schema', async () => {
        let Paging = class Paging extends CursorPaging {
        };
        Paging = (0, tslib_1.__decorate)([
            (0, graphql_1.InputType)()
        ], Paging);
        let PagingTypeSpec = class PagingTypeSpec {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            test(input) {
                return 1;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => graphql_1.Int),
            (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", [Paging]),
            (0, tslib_1.__metadata)("design:returntype", Number)
        ], PagingTypeSpec.prototype, "test", null);
        PagingTypeSpec = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)()
        ], PagingTypeSpec);
        const schema = await (0, __fixtures__1.generateSchema)([PagingTypeSpec]);
        expect(schema).toMatchSnapshot();
    });
    it('throw a validation error if first is defined with before', () => {
        const paging = (0, class_transformer_1.plainToClass)(CursorPaging, {
            first: 10,
            before: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        expect((0, class_validator_1.validateSync)(paging)).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `after` , `first`.',
                    CannotUseWithout: 'Cannot be used without `last`.',
                },
                property: 'before',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                    first: 10,
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `before` , `last`.',
                },
                property: 'first',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                    first: 10,
                },
                value: 10,
            },
        ]);
    });
    it('throw a validation error if last is defined with after', () => {
        const paging = (0, class_transformer_1.plainToClass)(CursorPaging, {
            last: 10,
            after: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        expect((0, class_validator_1.validateSync)(paging)).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `before` , `last`.',
                    CannotUseWithout: 'Cannot be used without `first`.',
                },
                property: 'after',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                    last: 10,
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
            {
                children: [],
                constraints: {
                    CannotUseWith: 'Cannot be used with `after` , `first`.',
                    CannotUseWithout: 'Cannot be used without `before`.',
                },
                property: 'last',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                    last: 10,
                },
                value: 10,
            },
        ]);
    });
    it('throw a validation error if after is defined without first', () => {
        const paging = (0, class_transformer_1.plainToClass)(CursorPaging, {
            after: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        const validateErrors = (0, class_validator_1.validateSync)(paging);
        expect(validateErrors).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWithout: 'Cannot be used without `first`.',
                },
                property: 'after',
                target: {
                    after: 'YXJyYXljb25uZWN0aW9uOjEx',
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
        ]);
    });
    it('throw a validation before if after is defined without last', () => {
        const paging = (0, class_transformer_1.plainToClass)(CursorPaging, {
            before: 'YXJyYXljb25uZWN0aW9uOjEx',
        });
        const validateErrors = (0, class_validator_1.validateSync)(paging);
        expect(validateErrors).toEqual([
            {
                children: [],
                constraints: {
                    CannotUseWithout: 'Cannot be used without `last`.',
                },
                property: 'before',
                target: {
                    before: 'YXJyYXljb25uZWN0aW9uOjEx',
                },
                value: 'YXJyYXljb25uZWN0aW9uOjEx',
            },
        ]);
    });
});
//# sourceMappingURL=paging.type.spec.js.map