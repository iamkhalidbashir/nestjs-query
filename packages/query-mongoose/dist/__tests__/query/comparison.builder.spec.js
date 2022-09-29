"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const test_entity_1 = require("../__fixtures__/test.entity");
const query_1 = require("../../src/query");
describe('ComparisonBuilder', () => {
    const createComparisonBuilder = () => new query_1.ComparisonBuilder((0, mongoose_1.model)('TestEntity', test_entity_1.TestEntitySchema));
    it('should throw an error for an invalid comparison type', () => {
        // @ts-ignore
        expect(() => createComparisonBuilder().build('stringType', 'bad', 'foo')).toThrow('unknown operator "bad"');
    });
    describe('eq comparisons', () => {
        it('should build an unqualified eq sql fragment', () => {
            expect(createComparisonBuilder().build('stringType', 'eq', 'foo')).toEqual({
                stringType: {
                    $eq: 'foo',
                },
            });
        });
        it('should convert query fields to objectIds if the field is an objectId', () => {
            expect(createComparisonBuilder().build('testReference', 'eq', '5f74af112fae2b251510e3ad')).toEqual({
                testReference: {
                    $eq: mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad'),
                },
            });
        });
    });
    it('should build neq sql fragment', () => {
        expect(createComparisonBuilder().build('numberType', 'neq', 1)).toEqual({
            numberType: {
                $ne: 1,
            },
        });
    });
    it('should build gt sql fragment', () => {
        expect(createComparisonBuilder().build('numberType', 'gt', 1)).toEqual({
            numberType: {
                $gt: 1,
            },
        });
    });
    it('should build gte sql fragment', () => {
        expect(createComparisonBuilder().build('numberType', 'gte', 1)).toEqual({
            numberType: {
                $gte: 1,
            },
        });
    });
    it('should build lt sql fragment', () => {
        expect(createComparisonBuilder().build('numberType', 'lt', 1)).toEqual({
            numberType: {
                $lt: 1,
            },
        });
    });
    it('should build lte sql fragment', () => {
        expect(createComparisonBuilder().build('numberType', 'lte', 1)).toEqual({
            numberType: {
                $lte: 1,
            },
        });
    });
    it('should build like sql fragment', () => {
        expect(createComparisonBuilder().build('stringType', 'like', '%hello%')).toEqual({
            stringType: {
                $regex: /.*hello.*/,
            },
        });
    });
    it('should build notLike sql fragment', () => {
        expect(createComparisonBuilder().build('stringType', 'notLike', '%hello%')).toEqual({
            stringType: {
                $not: { $regex: /.*hello.*/ },
            },
        });
    });
    it('should build iLike sql fragment', () => {
        expect(createComparisonBuilder().build('stringType', 'iLike', '%hello%')).toEqual({
            stringType: {
                $regex: /.*hello.*/i,
            },
        });
    });
    it('should build notILike sql fragment', () => {
        expect(createComparisonBuilder().build('stringType', 'notILike', '%hello%')).toEqual({
            stringType: {
                $not: { $regex: /.*hello.*/i },
            },
        });
    });
    describe('is comparisons', () => {
        it('should build is true', () => {
            expect(createComparisonBuilder().build('boolType', 'is', true)).toEqual({
                boolType: {
                    $eq: true,
                },
            });
        });
        it('should build is false', () => {
            expect(createComparisonBuilder().build('boolType', 'is', false)).toEqual({
                boolType: {
                    $eq: false,
                },
            });
        });
        it('should build is null', () => {
            expect(createComparisonBuilder().build('boolType', 'is', null)).toEqual({
                boolType: {
                    $eq: null,
                },
            });
        });
    });
    describe('isNot comparisons', () => {
        it('should build is true', () => {
            expect(createComparisonBuilder().build('boolType', 'isNot', true)).toEqual({
                boolType: {
                    $ne: true,
                },
            });
        });
        it('should build is false', () => {
            expect(createComparisonBuilder().build('boolType', 'isNot', false)).toEqual({
                boolType: {
                    $ne: false,
                },
            });
        });
        it('should build is null', () => {
            expect(createComparisonBuilder().build('boolType', 'isNot', null)).toEqual({
                boolType: {
                    $ne: null,
                },
            });
        });
    });
    describe('in comparisons', () => {
        it('should build in comparisons', () => {
            const arr = [1, 2, 3];
            expect(createComparisonBuilder().build('numberType', 'in', arr)).toEqual({
                numberType: {
                    $in: arr,
                },
            });
        });
        it('should convert query fields to objectIds if the field is an objectId', () => {
            expect(createComparisonBuilder().build('testReference', 'in', ['5f74af112fae2b251510e3ad'])).toEqual({
                testReference: {
                    $in: [mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad')],
                },
            });
        });
    });
    describe('notIn comparisons', () => {
        it('should build notIn comparisons', () => {
            const arr = ['a', 'b', 'c'];
            expect(createComparisonBuilder().build('stringType', 'notIn', arr)).toEqual({
                stringType: {
                    $nin: arr,
                },
            });
        });
        it('should convert query fields to objectIds if the field is an objectId', () => {
            expect(createComparisonBuilder().build('testReference', 'notIn', ['5f74af112fae2b251510e3ad'])).toEqual({
                testReference: {
                    $nin: [mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad')],
                },
            });
        });
    });
    describe('between comparisons', () => {
        it('should build between comparisons', () => {
            const between = { lower: 1, upper: 10 };
            expect(createComparisonBuilder().build('numberType', 'between', between)).toEqual({
                numberType: { $gte: between.lower, $lte: between.upper },
            });
        });
        it('should convert query fields to objectIds if the field is an objectId', () => {
            expect(createComparisonBuilder().build('testReference', 'between', {
                lower: '5f74af112fae2b251510e3ad',
                upper: '5f74af112fae2b251510e3ad',
            })).toEqual({
                testReference: {
                    $gte: mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad'),
                    $lte: mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad'),
                },
            });
        });
        it('should throw an error if the comparison is not a between comparison', () => {
            const between = [1, 10];
            expect(() => createComparisonBuilder().build('numberType', 'between', between)).toThrow('Invalid value for between expected {lower: val, upper: val} got [1,10]');
        });
    });
    describe('notBetween comparisons', () => {
        it('should build not between comparisons', () => {
            const between = { lower: 1, upper: 10 };
            expect(createComparisonBuilder().build('numberType', 'notBetween', between)).toEqual({
                numberType: { $lt: between.lower, $gt: between.upper },
            });
        });
        it('should convert query fields to objectIds if the field is an objectId', () => {
            expect(createComparisonBuilder().build('testReference', 'notBetween', {
                lower: '5f74af112fae2b251510e3ad',
                upper: '5f74af112fae2b251510e3ad',
            })).toEqual({
                testReference: {
                    $lt: mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad'),
                    $gt: mongoose_1.Types.ObjectId('5f74af112fae2b251510e3ad'),
                },
            });
        });
        it('should throw an error if the comparison is not a between comparison', () => {
            const between = [1, 10];
            expect(() => createComparisonBuilder().build('numberType', 'notBetween', between)).toThrow('Invalid value for notbetween expected {lower: val, upper: val} got [1,10]');
        });
    });
});
//# sourceMappingURL=comparison.builder.spec.js.map