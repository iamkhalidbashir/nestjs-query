"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
class TestDTO {
}
class TestEntity {
}
const fieldMap = {
    first: 'firstName',
    last: 'lastName',
    age: 'ageInYears',
};
describe('transformSort', () => {
    it('should return undefined if sorting is undefined', () => {
        expect((0, src_1.transformSort)(undefined, fieldMap)).toBeUndefined();
    });
    it('should transform the fields to the correct names', () => {
        const dtoSort = [
            { field: 'first', direction: src_1.SortDirection.DESC },
            { field: 'last', direction: src_1.SortDirection.ASC },
        ];
        const entitySort = [
            { field: 'firstName', direction: src_1.SortDirection.DESC },
            { field: 'lastName', direction: src_1.SortDirection.ASC },
        ];
        expect((0, src_1.transformSort)(dtoSort, fieldMap)).toEqual(entitySort);
    });
    it('should throw an error if the field name is not found', () => {
        const dtoSort = [
            { field: 'first', direction: src_1.SortDirection.DESC },
            // @ts-ignore
            { field: 'lasts', direction: src_1.SortDirection.ASC },
        ];
        expect(() => (0, src_1.transformSort)(dtoSort, fieldMap)).toThrow("No corresponding field found for 'lasts' when transforming SortField");
    });
});
describe('transformFilter', () => {
    it('should return undefined if filter is undefined', () => {
        expect((0, src_1.transformFilter)(undefined, fieldMap)).toBeUndefined();
    });
    it('should transform the fields to the correct names', () => {
        const dtoFilter = {
            first: { eq: 'foo' },
            last: { neq: 'bar' },
        };
        const entityFilter = {
            firstName: { eq: 'foo' },
            lastName: { neq: 'bar' },
        };
        expect((0, src_1.transformFilter)(dtoFilter, fieldMap)).toEqual(entityFilter);
    });
    it('should transform AND groupings to the correct names', () => {
        const dtoFilter = {
            and: [{ first: { eq: 'foo' } }, { last: { neq: 'bar' } }],
        };
        const entityFilter = {
            and: [{ firstName: { eq: 'foo' } }, { lastName: { neq: 'bar' } }],
        };
        expect((0, src_1.transformFilter)(dtoFilter, fieldMap)).toEqual(entityFilter);
    });
    it('should not transform AND groupings if the array is undefined', () => {
        const dtoFilter = {
            and: undefined,
            first: { eq: 'foo' },
        };
        const entityFilter = {
            and: undefined,
            firstName: { eq: 'foo' },
        };
        expect((0, src_1.transformFilter)(dtoFilter, fieldMap)).toEqual(entityFilter);
    });
    it('should transform OR groupings to the correct names', () => {
        const dtoFilter = {
            or: [{ first: { eq: 'foo' } }, { last: { neq: 'bar' } }],
        };
        const entityFilter = {
            or: [{ firstName: { eq: 'foo' } }, { lastName: { neq: 'bar' } }],
        };
        expect((0, src_1.transformFilter)(dtoFilter, fieldMap)).toEqual(entityFilter);
    });
    it('should transform nested groupings to the correct names', () => {
        const dtoFilter = {
            or: [
                { and: [{ first: { eq: 'foo' } }, { last: { neq: 'bar' } }] },
                { or: [{ first: { eq: 'foo' } }, { last: { neq: 'bar' } }] },
            ],
        };
        const entityFilter = {
            or: [
                { and: [{ firstName: { eq: 'foo' } }, { lastName: { neq: 'bar' } }] },
                { or: [{ firstName: { eq: 'foo' } }, { lastName: { neq: 'bar' } }] },
            ],
        };
        expect((0, src_1.transformFilter)(dtoFilter, fieldMap)).toEqual(entityFilter);
    });
    it('should throw an error if the field name is not found', () => {
        const dtoFilter = {
            first: { eq: 'foo' },
            // @ts-ignore
            lasts: { neq: 'bar' },
        };
        expect(() => (0, src_1.transformFilter)(dtoFilter, fieldMap)).toThrow("No corresponding field found for 'lasts' when transforming Filter");
    });
});
describe('transformQuery', () => {
    it('should transform a Query', () => {
        const dtoQuery = {
            filter: {
                first: { eq: 'foo' },
                last: { neq: 'bar' },
            },
            paging: { offset: 10, limit: 10 },
            sorting: [
                { field: 'first', direction: src_1.SortDirection.DESC },
                { field: 'last', direction: src_1.SortDirection.ASC },
            ],
        };
        const entityQuery = {
            filter: {
                firstName: { eq: 'foo' },
                lastName: { neq: 'bar' },
            },
            paging: { offset: 10, limit: 10 },
            sorting: [
                { field: 'firstName', direction: src_1.SortDirection.DESC },
                { field: 'lastName', direction: src_1.SortDirection.ASC },
            ],
        };
        expect((0, src_1.transformQuery)(dtoQuery, fieldMap)).toEqual(entityQuery);
    });
});
describe('applyFilter', () => {
    it('should handle eq comparisons', () => {
        const filter = {
            first: { eq: 'foo' },
        };
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'bar', last: 'foo' }, filter)).toBe(false);
    });
    it('should handle neq comparisons', () => {
        const filter = {
            first: { neq: 'foo' },
        };
        expect((0, src_1.applyFilter)({ first: 'bar', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle gt comparisons', () => {
        const filter = {
            first: { gt: 'b' },
        };
        expect((0, src_1.applyFilter)({ first: 'c', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'a', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle gte comparisons', () => {
        const filter = {
            first: { gte: 'b' },
        };
        expect((0, src_1.applyFilter)({ first: 'c', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'a', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle lt comparisons', () => {
        const filter = {
            first: { lt: 'b' },
        };
        expect((0, src_1.applyFilter)({ first: 'a', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'c', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle lte comparisons', () => {
        const filter = {
            first: { lte: 'b' },
        };
        expect((0, src_1.applyFilter)({ first: 'a', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'c', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle like comparisons', () => {
        const filter = {
            first: { like: '%oo' },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'FOO', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'Foo Bar', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'o bar', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle notLike comparisons', () => {
        const filter = {
            first: { notLike: '%oo' },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'FOO', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'Foo Bar', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'o bar', last: 'bar' }, filter)).toBe(true);
    });
    it('should handle iLike comparisons', () => {
        const filter = {
            first: { iLike: '%oo' },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'FOO', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'Foo Bar', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'o bar', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle notILike comparisons', () => {
        const filter = {
            first: { notILike: '%oo' },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'FOO', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'Foo Bar', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'o bar', last: 'bar' }, filter)).toBe(true);
    });
    it('should handle in comparisons', () => {
        const filter = {
            first: { in: ['Foo', 'Bar', 'Baz'] },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'Bar', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'Baz', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'Boo', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle notIn comparisons', () => {
        const filter = {
            first: { notIn: ['Foo', 'Bar', 'Baz'] },
        };
        expect((0, src_1.applyFilter)({ first: 'Foo', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'Bar', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'Baz', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'Boo', last: 'bar' }, filter)).toBe(true);
    });
    it('should handle between comparisons', () => {
        const filter = {
            first: { between: { lower: 'b', upper: 'd' } },
        };
        expect((0, src_1.applyFilter)({ first: 'a', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'c', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'd', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'e', last: 'bar' }, filter)).toBe(false);
    });
    it('should handle notBetween comparisons', () => {
        const filter = {
            first: { notBetween: { lower: 'b', upper: 'd' } },
        };
        expect((0, src_1.applyFilter)({ first: 'a', last: 'foo' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'b', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'c', last: 'foo' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'd', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'e', last: 'bar' }, filter)).toBe(true);
    });
    it('should throw an error for an unknown operator', () => {
        const filter = {
            // @ts-ignore
            first: { foo: 'bar' },
        };
        expect(() => (0, src_1.applyFilter)({ first: 'baz', last: 'kaz' }, filter)).toThrow('unknown comparison "foo"');
    });
    it('should handle and grouping', () => {
        const filter = {
            and: [{ first: { eq: 'foo' } }, { last: { like: '%bar' } }],
        };
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'foobar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'oo', last: 'bar' }, filter)).toBe(false);
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'baz' }, filter)).toBe(false);
    });
    it('should handle or grouping', () => {
        const filter = {
            or: [{ first: { eq: 'foo' } }, { last: { like: '%bar' } }],
        };
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'foobar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'oo', last: 'bar' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'foo', last: 'baz' }, filter)).toBe(true);
        expect((0, src_1.applyFilter)({ first: 'fo', last: 'ba' }, filter)).toBe(false);
    });
    describe('nested objects', () => {
        const withChild = (child) => ({
            first: 'bar',
            child,
        });
        const withGrandChild = (child) => ({
            first: 'bar',
            child: { first: 'baz', child },
        });
        it('should handle like comparisons', () => {
            const parentFilter = { child: { first: { like: '%foo' } } };
            const grandParentFilter = { child: { child: { first: { like: '%foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'afoo' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'afoo' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(false);
        });
        it('should handle notLike comparisons', () => {
            const parentFilter = { child: { first: { notLike: '%foo' } } };
            const grandParentFilter = { child: { child: { first: { notLike: '%foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'afoo' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'afoo' }), grandParentFilter)).toBe(false);
        });
        it('should handle iLike comparisons', () => {
            const parentFilter = { child: { first: { iLike: '%foo' } } };
            const grandParentFilter = { child: { child: { first: { iLike: '%foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'AFOO' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'AFOO' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(false);
        });
        it('should handle notILike comparisons', () => {
            const parentFilter = { child: { first: { notILike: '%foo' } } };
            const grandParentFilter = { child: { child: { first: { notILike: '%foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'AFOO' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'AFOO' }), grandParentFilter)).toBe(false);
        });
        it('should handle in comparisons', () => {
            const parentFilter = { child: { first: { in: ['foo'] } } };
            const grandParentFilter = { child: { child: { first: { in: ['foo'] } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(false);
        });
        it('should handle notIn comparisons', () => {
            const parentFilter = { child: { first: { notIn: ['foo'] } } };
            const grandParentFilter = { child: { child: { first: { notIn: ['foo'] } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(false);
        });
        it('should handle between comparisons', () => {
            const parentFilter = { child: { first: { between: { lower: 'a', upper: 'c' } } } };
            const grandParentFilter = {
                child: { child: { first: { between: { lower: 'a', upper: 'c' } } } },
            };
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(false);
        });
        it('should handle notBetween comparisons', () => {
            const parentFilter = { child: { first: { notBetween: { lower: 'a', upper: 'c' } } } };
            const grandParentFilter = {
                child: { child: { first: { notBetween: { lower: 'a', upper: 'c' } } } },
            };
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(false);
        });
        it('should handle gt comparisons', () => {
            const parentFilter = { child: { first: { gt: 'c' } } };
            const grandParentFilter = { child: { child: { first: { gt: 'c' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withChild({ first: 'c' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'c' }), grandParentFilter)).toBe(false);
        });
        it('should handle gte comparisons', () => {
            const parentFilter = { child: { first: { gte: 'c' } } };
            const grandParentFilter = { child: { child: { first: { gte: 'c' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'c' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'c' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(false);
        });
        it('should handle lt comparisons', () => {
            const parentFilter = { child: { first: { lt: 'c' } } };
            const grandParentFilter = { child: { child: { first: { lt: 'c' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withChild({ first: 'c' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'c' }), grandParentFilter)).toBe(false);
        });
        it('should handle lte comparisons', () => {
            const parentFilter = { child: { first: { lte: 'c' } } };
            const grandParentFilter = { child: { child: { first: { lte: 'c' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'c' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'b' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'd' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'c' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'b' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'd' }), grandParentFilter)).toBe(false);
        });
        it('should handle eq comparisons', () => {
            const parentFilter = { child: { first: { eq: 'foo' } } };
            const grandParentFilter = { child: { child: { first: { eq: 'foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(false);
        });
        it('should handle neq comparisons', () => {
            const parentFilter = { child: { first: { neq: 'foo' } } };
            const grandParentFilter = { child: { child: { first: { neq: 'foo' } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'bar' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'bar' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(false);
        });
        it('should handle is comparisons', () => {
            const parentFilter = { child: { first: { is: null } } };
            const grandParentFilter = { child: { child: { first: { is: null } } } };
            expect((0, src_1.applyFilter)(withChild({ first: null }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({}), parentFilter)).toBe(true); // undefined
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({ first: null }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({}), grandParentFilter)).toBe(true); // undefined
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(false);
        });
        it('should handle isNot comparisons', () => {
            const parentFilter = { child: { first: { isNot: null } } };
            const grandParentFilter = { child: { child: { first: { isNot: null } } } };
            expect((0, src_1.applyFilter)(withChild({ first: 'foo' }), parentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withChild({ first: null }), parentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withChild({}), parentFilter)).toBe(false); // undefined
            expect((0, src_1.applyFilter)(withGrandChild({ first: 'foo' }), grandParentFilter)).toBe(true);
            expect((0, src_1.applyFilter)(withGrandChild({ first: null }), grandParentFilter)).toBe(false);
            expect((0, src_1.applyFilter)(withGrandChild({}), grandParentFilter)).toBe(false); // undefined
        });
    });
    describe('nested nulls', () => {
        const singleNestedNull = () => ({ child: null });
        const doubleNestedNull = () => ({ child: null });
        it('should handle like comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { like: '%foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { like: '%foo' } } } })).toBe(false);
        });
        it('should handle notLike comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { notLike: '%foo' } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { notLike: '%foo' } } } })).toBe(true);
        });
        it('should handle iLike comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { iLike: '%foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { iLike: '%foo' } } } })).toBe(false);
        });
        it('should handle notILike comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { notILike: '%foo' } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { notILike: '%foo' } } } })).toBe(true);
        });
        it('should handle in comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { in: ['foo'] } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { in: ['foo'] } } } })).toBe(false);
        });
        it('should handle notIn comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { notIn: ['foo'] } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { notIn: ['foo'] } } } })).toBe(true);
        });
        it('should handle between comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { between: { lower: 'foo', upper: 'bar' } } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { between: { lower: 'foo', upper: 'bar' } } } } })).toBe(false);
        });
        it('should handle notBetween comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { notBetween: { lower: 'foo', upper: 'bar' } } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), {
                child: { child: { first: { notBetween: { lower: 'foo', upper: 'bar' } } } },
            })).toBe(true);
        });
        it('should handle gt comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { gt: 'foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { gt: 'foo' } } } })).toBe(false);
        });
        it('should handle gte comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { gte: 'foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { gte: 'foo' } } } })).toBe(false);
        });
        it('should handle lt comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { lt: 'foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { lt: 'foo' } } } })).toBe(false);
        });
        it('should handle lte comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { lte: 'foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { lte: 'foo' } } } })).toBe(false);
        });
        it('should handle eq comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { eq: 'foo' } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { eq: 'foo' } } } })).toBe(false);
        });
        it('should handle neq comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { neq: 'foo' } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { neq: 'foo' } } } })).toBe(true);
        });
        it('should handle is comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { is: null } } })).toBe(true);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { is: null } } } })).toBe(true);
        });
        it('should handle isNot comparisons', () => {
            expect((0, src_1.applyFilter)(singleNestedNull(), { child: { first: { isNot: null } } })).toBe(false);
            expect((0, src_1.applyFilter)(doubleNestedNull(), { child: { child: { first: { isNot: null } } } })).toBe(false);
        });
    });
});
describe('getFilterFields', () => {
    class Test {
    }
    it('should get all fields at root of filter', () => {
        const filter = {
            boolField: { is: true },
            strField: { eq: '' },
            testRelation: {
                boolField: { is: false },
            },
        };
        expect((0, src_1.getFilterFields)(filter).sort()).toEqual(['boolField', 'strField', 'testRelation']);
    });
    it('should get all fields in and', () => {
        const filter = {
            and: [
                { boolField: { is: true } },
                { strField: { eq: '' } },
                {
                    testRelation: {
                        boolField: { is: false },
                    },
                },
            ],
        };
        expect((0, src_1.getFilterFields)(filter).sort()).toEqual(['boolField', 'strField', 'testRelation']);
    });
    it('should get all fields in or', () => {
        const filter = {
            or: [
                { boolField: { is: true } },
                { strField: { eq: '' } },
                {
                    testRelation: {
                        boolField: { is: false },
                    },
                },
            ],
        };
        expect((0, src_1.getFilterFields)(filter).sort()).toEqual(['boolField', 'strField', 'testRelation']);
    });
    it('should merge all identifiers  between root, and, or', () => {
        const filter = {
            or: [{ and: [{ boolField: { is: true } }, { strField: { eq: '' } }] }],
            testRelation: {
                boolField: { is: false },
            },
        };
        expect((0, src_1.getFilterFields)(filter).sort()).toEqual(['boolField', 'strField', 'testRelation']);
    });
});
describe('transformAggregateQuery', () => {
    it('should transform an aggregate query', () => {
        const aggQuery = {
            count: ['first'],
            sum: ['age'],
            max: ['first', 'last', 'age'],
            min: ['first', 'last', 'age'],
        };
        const entityAggQuery = {
            count: ['firstName'],
            sum: ['ageInYears'],
            max: ['firstName', 'lastName', 'ageInYears'],
            min: ['firstName', 'lastName', 'ageInYears'],
        };
        expect((0, src_1.transformAggregateQuery)(aggQuery, fieldMap)).toEqual(entityAggQuery);
    });
    it('should throw an error if an unknown field is encountered', () => {
        const aggQuery = {
            count: ['first'],
            sum: ['age'],
            max: ['first', 'last', 'age'],
            min: ['first', 'last', 'age'],
        };
        // @ts-ignore
        expect(() => (0, src_1.transformAggregateQuery)(aggQuery, { last: 'lastName' })).toThrow("No corresponding field found for 'first' when transforming aggregateQuery");
    });
});
describe('transformAggregateResponse', () => {
    it('should transform an aggregate query', () => {
        const aggResponse = {
            count: {
                first: 2,
            },
            sum: {
                age: 101,
            },
            max: {
                first: 'firstz',
                last: 'lastz',
                age: 100,
            },
            min: {
                first: 'firsta',
                last: 'lasta',
                age: 1,
            },
        };
        const entityAggResponse = {
            count: {
                firstName: 2,
            },
            sum: {
                ageInYears: 101,
            },
            max: {
                firstName: 'firstz',
                lastName: 'lastz',
                ageInYears: 100,
            },
            min: {
                firstName: 'firsta',
                lastName: 'lasta',
                ageInYears: 1,
            },
        };
        expect((0, src_1.transformAggregateResponse)(aggResponse, fieldMap)).toEqual(entityAggResponse);
    });
    it('should handle empty aggregate fields', () => {
        const aggResponse = {
            count: {
                first: 2,
            },
        };
        const entityAggResponse = {
            count: {
                firstName: 2,
            },
        };
        expect((0, src_1.transformAggregateResponse)(aggResponse, fieldMap)).toEqual(entityAggResponse);
    });
    it('should throw an error if the field is not found', () => {
        let aggResponse = {
            count: {
                first: 2,
            },
        };
        // @ts-ignore
        expect(() => (0, src_1.transformAggregateResponse)(aggResponse, { last: 'lastName' })).toThrow("No corresponding field found for 'first' when transforming aggregateQuery");
        aggResponse = {
            max: {
                age: 10,
            },
        };
        // @ts-ignore
        expect(() => (0, src_1.transformAggregateResponse)(aggResponse, { last: 'lastName' })).toThrow("No corresponding field found for 'age' when transforming aggregateQuery");
    });
});
describe('applySort', () => {
    const date = (day) => new Date(`2020-1-${day}`);
    describe('sort asc', () => {
        const testCases = [
            {
                description: 'sort strings asc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.ASC }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }],
                expected: [{ first: 'alice' }, { first: 'bob' }, { first: 'sally' }, { first: 'zane' }],
            },
            {
                description: 'sort strings with nulls asc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.ASC }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{ first: 'alice' }, { first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: null }, {}],
            },
            {
                description: 'sort strings with nulls first asc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{}, { first: null }, { first: 'alice' }, { first: 'bob' }, { first: 'sally' }, { first: 'zane' }],
            },
            {
                description: 'sort strings with nulls last asc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{ first: 'alice' }, { first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: null }, {}],
            },
            {
                description: 'sort numbers asc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.ASC }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }],
                expected: [{ age: 30 }, { age: 31 }, { age: 32 }, { age: 33 }],
            },
            {
                description: 'sort numbers with nulls asc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.ASC }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{ age: 30 }, { age: 31 }, { age: 32 }, { age: 33 }, { age: null }, {}],
            },
            {
                description: 'sort numbers with nulls first asc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{}, { age: null }, { age: 30 }, { age: 31 }, { age: 32 }, { age: 33 }],
            },
            {
                description: 'sort numbers with nulls last asc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{ age: 30 }, { age: 31 }, { age: 32 }, { age: 33 }, { age: null }, {}],
            },
            {
                description: 'sort booleans asc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.ASC }],
                input: [{ isVerified: true }, { isVerified: false }, { isVerified: false }, { isVerified: true }],
                expected: [{ isVerified: false }, { isVerified: false }, { isVerified: true }, { isVerified: true }],
            },
            {
                description: 'sort booleans with nulls asc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.ASC }],
                input: [
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
                expected: [
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
            },
            {
                description: 'sort booleans with nulls first asc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
                expected: [
                    {},
                    { isVerified: null },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: true },
                ],
            },
            {
                description: 'sort booleans with nulls last asc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
                expected: [
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
            },
            {
                description: 'sort dates asc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.ASC }],
                input: [{ created: date(4) }, { created: date(2) }, { created: date(3) }, { created: date(1) }],
                expected: [{ created: date(1) }, { created: date(2) }, { created: date(3) }, { created: date(4) }],
            },
            {
                description: 'sort dates with nulls asc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.ASC }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    { created: date(1) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(4) },
                    { created: null },
                    {},
                ],
            },
            {
                description: 'sort dates with nulls first asc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    {},
                    { created: null },
                    { created: date(1) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(4) },
                ],
            },
            {
                description: 'sort dates with nulls last asc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    { created: date(1) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(4) },
                    { created: null },
                    {},
                ],
            },
        ];
        testCases.forEach(({ description, input, expected, sortFields }) => {
            it(`should ${description}`, () => {
                expect((0, src_1.applySort)(input, sortFields)).toEqual(expected);
            });
        });
    });
    describe('should sort desc', () => {
        const testCases = [
            {
                description: 'sort strings desc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.DESC }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }],
                expected: [{ first: 'zane' }, { first: 'sally' }, { first: 'bob' }, { first: 'alice' }],
            },
            {
                description: 'sort strings with nulls desc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.DESC }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{}, { first: null }, { first: 'zane' }, { first: 'sally' }, { first: 'bob' }, { first: 'alice' }],
            },
            {
                description: 'sort strings with nulls first desc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{}, { first: null }, { first: 'zane' }, { first: 'sally' }, { first: 'bob' }, { first: 'alice' }],
            },
            {
                description: 'sort strings with nulls last desc',
                sortFields: [{ field: 'first', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [{ first: 'bob' }, { first: 'sally' }, { first: 'zane' }, { first: 'alice' }, { first: null }, {}],
                expected: [{ first: 'zane' }, { first: 'sally' }, { first: 'bob' }, { first: 'alice' }, { first: null }, {}],
            },
            {
                description: 'sort numbers desc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.DESC }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }],
                expected: [{ age: 33 }, { age: 32 }, { age: 31 }, { age: 30 }],
            },
            {
                description: 'sort numbers with nulls desc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.DESC }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{}, { age: null }, { age: 33 }, { age: 32 }, { age: 31 }, { age: 30 }],
            },
            {
                description: 'sort numbers with nulls first desc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{}, { age: null }, { age: 33 }, { age: 32 }, { age: 31 }, { age: 30 }],
            },
            {
                description: 'sort numbers with nulls last desc',
                sortFields: [{ field: 'age', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [{ age: 30 }, { age: 33 }, { age: 31 }, { age: 32 }, { age: null }, {}],
                expected: [{ age: 33 }, { age: 32 }, { age: 31 }, { age: 30 }, { age: null }, {}],
            },
            {
                description: 'sort booleans desc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.DESC }],
                input: [{ isVerified: true }, { isVerified: false }, { isVerified: false }, { isVerified: true }],
                expected: [{ isVerified: true }, { isVerified: true }, { isVerified: false }, { isVerified: false }],
            },
            {
                description: 'sort booleans with nulls desc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.DESC }],
                input: [
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
                expected: [
                    {},
                    { isVerified: null },
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                ],
            },
            {
                description: 'sort booleans with nulls first desc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: true },
                    { isVerified: null },
                    {},
                ],
                expected: [
                    {},
                    { isVerified: null },
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                ],
            },
            {
                description: 'sort booleans with nulls last desc',
                sortFields: [{ field: 'isVerified', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: null },
                    { isVerified: false },
                    { isVerified: false },
                    {},
                ],
                expected: [
                    { isVerified: true },
                    { isVerified: true },
                    { isVerified: false },
                    { isVerified: false },
                    { isVerified: null },
                    {},
                ],
            },
            {
                description: 'sort dates desc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.DESC }],
                input: [{ created: date(4) }, { created: date(2) }, { created: date(3) }, { created: date(1) }],
                expected: [{ created: date(4) }, { created: date(3) }, { created: date(2) }, { created: date(1) }],
            },
            {
                description: 'sort dates with nulls desc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.DESC }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    {},
                    { created: null },
                    { created: date(4) },
                    { created: date(3) },
                    { created: date(2) },
                    { created: date(1) },
                ],
            },
            {
                description: 'sort dates with nulls first desc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_FIRST }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    {},
                    { created: null },
                    { created: date(4) },
                    { created: date(3) },
                    { created: date(2) },
                    { created: date(1) },
                ],
            },
            {
                description: 'sort dates with nulls last desc',
                sortFields: [{ field: 'created', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST }],
                input: [
                    { created: date(4) },
                    { created: date(2) },
                    { created: date(3) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
                expected: [
                    { created: date(4) },
                    { created: date(3) },
                    { created: date(2) },
                    { created: date(1) },
                    { created: null },
                    {},
                ],
            },
        ];
        testCases.forEach(({ description, input, expected, sortFields }) => {
            it(`should ${description}`, () => {
                expect((0, src_1.applySort)(input, sortFields)).toEqual(expected);
            });
        });
    });
    describe('multi sort', () => {
        const testCases = [
            {
                description: 'sort multiple fields asc',
                sortFields: [
                    { field: 'first', direction: src_1.SortDirection.ASC },
                    { field: 'last', direction: src_1.SortDirection.ASC },
                ],
                input: [
                    { first: 'd', last: 'a' },
                    { first: 'a', last: 'a' },
                    { first: 'b', last: 'a' },
                    { first: 'c', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'a', last: 'b' },
                    { first: 'c', last: 'b' },
                    { first: 'b', last: 'b' },
                    { first: 'd', last: 'c' },
                    { first: 'c', last: 'c' },
                    { first: 'a', last: 'c' },
                    { first: 'b', last: 'c' },
                ],
                expected: [
                    { first: 'a', last: 'a' },
                    { first: 'a', last: 'b' },
                    { first: 'a', last: 'c' },
                    { first: 'b', last: 'a' },
                    { first: 'b', last: 'b' },
                    { first: 'b', last: 'c' },
                    { first: 'c', last: 'a' },
                    { first: 'c', last: 'b' },
                    { first: 'c', last: 'c' },
                    { first: 'd', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'd', last: 'c' },
                ],
            },
            {
                description: 'sort multiple fields desc',
                sortFields: [
                    { field: 'first', direction: src_1.SortDirection.DESC },
                    { field: 'last', direction: src_1.SortDirection.DESC },
                ],
                input: [
                    { first: 'd', last: 'a' },
                    { first: 'a', last: 'a' },
                    { first: 'b', last: 'a' },
                    { first: 'c', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'a', last: 'b' },
                    { first: 'c', last: 'b' },
                    { first: 'b', last: 'b' },
                    { first: 'd', last: 'c' },
                    { first: 'c', last: 'c' },
                    { first: 'a', last: 'c' },
                    { first: 'b', last: 'c' },
                ],
                expected: [
                    { first: 'd', last: 'c' },
                    { first: 'd', last: 'b' },
                    { first: 'd', last: 'a' },
                    { first: 'c', last: 'c' },
                    { first: 'c', last: 'b' },
                    { first: 'c', last: 'a' },
                    { first: 'b', last: 'c' },
                    { first: 'b', last: 'b' },
                    { first: 'b', last: 'a' },
                    { first: 'a', last: 'c' },
                    { first: 'a', last: 'b' },
                    { first: 'a', last: 'a' },
                ],
            },
            {
                description: 'sort multiple fields asc and desc',
                sortFields: [
                    { field: 'first', direction: src_1.SortDirection.DESC },
                    { field: 'last', direction: src_1.SortDirection.ASC },
                ],
                input: [
                    { first: 'd', last: 'a' },
                    { first: 'a', last: 'a' },
                    { first: 'b', last: 'a' },
                    { first: 'c', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'a', last: 'b' },
                    { first: 'c', last: 'b' },
                    { first: 'b', last: 'b' },
                    { first: 'd', last: 'c' },
                    { first: 'c', last: 'c' },
                    { first: 'a', last: 'c' },
                    { first: 'b', last: 'c' },
                ],
                expected: [
                    { first: 'd', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'd', last: 'c' },
                    { first: 'c', last: 'a' },
                    { first: 'c', last: 'b' },
                    { first: 'c', last: 'c' },
                    { first: 'b', last: 'a' },
                    { first: 'b', last: 'b' },
                    { first: 'b', last: 'c' },
                    { first: 'a', last: 'a' },
                    { first: 'a', last: 'b' },
                    { first: 'a', last: 'c' },
                ],
            },
            {
                description: 'sort multiple fields asc nulls first and desc nulls last',
                sortFields: [
                    { field: 'first', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST },
                    { field: 'last', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST },
                ],
                input: [
                    { first: 'd' },
                    { first: 'a' },
                    { first: 'b' },
                    { first: 'c', last: null },
                    { first: 'a', last: 'a' },
                    { first: 'c', last: 'b' },
                    { first: 'b', last: 'b' },
                    { first: 'c' },
                    { first: 'a', last: null },
                    { first: 'c', last: 'c' },
                    { last: 'a' },
                    { first: 'd', last: 'a' },
                    { last: null },
                    { first: 'd', last: 'b' },
                    { last: 'b' },
                    {},
                    { last: 'c' },
                    { first: 'b', last: 'c' },
                    { first: 'd', last: 'c' },
                    { first: 'b', last: 'a' },
                    { first: 'a', last: 'b' },
                    { first: 'd', last: null },
                    { first: 'b', last: null },
                    { first: 'a', last: 'c' },
                    { first: 'c', last: 'a' },
                ],
                expected: [
                    { first: 'd' },
                    { first: 'd', last: null },
                    { first: 'd', last: 'a' },
                    { first: 'd', last: 'b' },
                    { first: 'd', last: 'c' },
                    { first: 'c' },
                    { first: 'c', last: null },
                    { first: 'c', last: 'a' },
                    { first: 'c', last: 'b' },
                    { first: 'c', last: 'c' },
                    { first: 'b' },
                    { first: 'b', last: null },
                    { first: 'b', last: 'a' },
                    { first: 'b', last: 'b' },
                    { first: 'b', last: 'c' },
                    { first: 'a' },
                    { first: 'a', last: null },
                    { first: 'a', last: 'a' },
                    { first: 'a', last: 'b' },
                    { first: 'a', last: 'c' },
                    {},
                    { last: null },
                    { last: 'a' },
                    { last: 'b' },
                    { last: 'c' },
                ],
            },
            {
                description: 'sort multiple fields with all first columns null',
                sortFields: [
                    { field: 'first', direction: src_1.SortDirection.DESC, nulls: src_1.SortNulls.NULLS_LAST },
                    { field: 'last', direction: src_1.SortDirection.ASC, nulls: src_1.SortNulls.NULLS_FIRST },
                ],
                input: [{ last: 'a' }, { last: null }, { last: 'b' }, {}, { last: 'c' }],
                expected: [{}, { last: null }, { last: 'a' }, { last: 'b' }, { last: 'c' }],
            },
        ];
        testCases.forEach(({ description, input, expected, sortFields }) => {
            it(`should ${description}`, () => {
                expect((0, src_1.applySort)(input, sortFields)).toEqual(expected);
            });
        });
    });
});
describe('applyPaging', () => {
    const testCases = [
        {
            description: 'return all elements if paging is empty',
            paging: {},
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
        },
        {
            description: 'apply a limit',
            paging: { limit: 3 },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
            ],
        },
        {
            description: 'apply an offset',
            paging: { offset: 2 },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
        },
        {
            description: 'apply a limit and offset',
            paging: { offset: 1, limit: 2 },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
            ],
        },
    ];
    testCases.forEach(({ description, input, expected, paging }) => {
        it(`should ${description}`, () => {
            expect((0, src_1.applyPaging)(input, paging)).toEqual(expected);
        });
    });
});
describe('applyQuery', () => {
    const testCases = [
        {
            description: 'return all elements if the query is empty',
            query: {},
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
        },
        {
            description: 'apply a filter',
            query: { filter: { first: { in: ['bob', 'alice'] } } },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'bob', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
            ],
        },
        {
            description: 'apply sorting',
            query: { sorting: [{ field: 'first', direction: src_1.SortDirection.ASC }] },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'alice', last: 'yukon' },
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
        },
        {
            description: 'apply paging',
            query: { paging: { offset: 1, limit: 2 } },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
            ],
            expected: [
                { first: 'sally', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
            ],
        },
        {
            description: 'apply filter, sorting and paging',
            query: {
                filter: { first: { in: ['bob', 'sally', 'alice', 'zane'] } },
                sorting: [{ field: 'first', direction: src_1.SortDirection.DESC }],
                paging: { offset: 1, limit: 2 },
            },
            input: [
                { first: 'bob', last: 'yukon' },
                { first: 'bill', last: 'yukon' },
                { first: 'sally', last: 'yukon' },
                { first: 'sue', last: 'yukon' },
                { first: 'alice', last: 'yukon' },
                { first: 'alex', last: 'yukon' },
                { first: 'zane', last: 'yukon' },
                { first: 'zeb', last: 'yukon' },
            ],
            expected: [
                { first: 'sally', last: 'yukon' },
                { first: 'bob', last: 'yukon' },
            ],
        },
    ];
    testCases.forEach(({ description, input, expected, query }) => {
        it(`should ${description}`, () => {
            expect((0, src_1.applyQuery)(input, query)).toEqual(expected);
        });
    });
});
describe('getFilterComparisons', () => {
    it('should get list of comparisons from a filter given a key', () => {
        const f0 = {};
        const f1 = {
            bar: { gt: 0 },
            baz: { gt: 1 },
        };
        const f2 = {
            bar: { gt: 0 },
            baz: { gt: 1 },
            and: [{ baz: { lt: 2 }, bar: { lt: 3 } }],
        };
        const f3 = {
            bar: { gt: 0 },
            baz: { gt: 1 },
            or: [{ baz: { lt: 4 }, bar: { lt: 5 } }],
        };
        const f4 = {
            bar: { gt: 0 },
            baz: { gt: 1 },
            and: [{ baz: { lt: 2 }, bar: { lt: 3 } }],
            or: [{ baz: { lt: 4 }, bar: { lt: 5 } }],
        };
        expect((0, src_1.getFilterComparisons)(f0, 'bar')).toEqual(expect.arrayContaining([]));
        expect((0, src_1.getFilterComparisons)(f1, 'bar')).toEqual(expect.arrayContaining([{ gt: 0 }]));
        expect((0, src_1.getFilterComparisons)(f2, 'bar')).toEqual(expect.arrayContaining([{ gt: 0 }, { lt: 3 }]));
        expect((0, src_1.getFilterComparisons)(f3, 'bar')).toEqual(expect.arrayContaining([{ gt: 0 }, { lt: 5 }]));
        expect((0, src_1.getFilterComparisons)(f4, 'bar')).toEqual(expect.arrayContaining([{ gt: 0 }, { lt: 3 }, { lt: 5 }]));
    });
});
describe('getFilterOmitting', () => {
    it('should omit a key from a filter', () => {
        const filter = {
            bar: { gt: 0 },
            baz: { gt: 0 },
            and: [{ baz: { lt: 100 }, bar: { lt: 100 } }],
            or: [{ baz: { lt: 100 }, bar: { lt: 100 } }],
        };
        expect((0, src_1.getFilterOmitting)(filter, 'baz')).toEqual({
            bar: { gt: 0 },
            and: [{ bar: { lt: 100 } }],
            or: [{ bar: { lt: 100 } }],
        });
    });
    it('should delete and and or properties if they are empty after omitting', () => {
        const filter = {
            bar: { gt: 0 },
            baz: { gt: 0 },
            and: [{ baz: { lt: 100 } }],
            or: [{ baz: { lt: 100 } }],
        };
        expect((0, src_1.getFilterOmitting)(filter, 'baz')).toEqual({
            bar: { gt: 0 },
        });
    });
});
describe('mergeFilter', () => {
    it('should merge two filters', () => {
        const f1 = {
            bar: { gt: 0 },
        };
        const f2 = {
            baz: { gt: 0 },
        };
        expect((0, src_1.mergeFilter)(f1, f2)).toEqual({
            and: expect.arrayContaining([f1, f2]),
        });
    });
    it('should noop if one of the filters is empty', () => {
        const filter = {
            bar: { gt: 0 },
        };
        expect((0, src_1.mergeFilter)(filter, {})).toEqual(filter);
        expect((0, src_1.mergeFilter)({}, filter)).toEqual(filter);
    });
});
//# sourceMappingURL=helpers.spec.js.map