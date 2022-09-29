"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const query_1 = require("../../src/query");
describe('SQLComparisonBuilder', () => {
    const createSQLComparisonBuilder = () => new query_1.SQLComparisonBuilder();
    it('should throw an error for an invalid comparison type', () => {
        // @ts-ignore
        expect(() => createSQLComparisonBuilder().build('stringType', 'bad', 'foo')).toThrow('unknown operator "bad"');
    });
    describe('eq comparisons', () => {
        it('should build an unqualified eq sql fragment', () => {
            expect(createSQLComparisonBuilder().build('stringType', 'eq', 'foo')).toEqual({
                stringType: {
                    [sequelize_1.Op.eq]: 'foo',
                },
            });
        });
    });
    it('should build neq sql fragment', () => {
        expect(createSQLComparisonBuilder().build('numberType', 'neq', 1)).toEqual({
            numberType: {
                [sequelize_1.Op.ne]: 1,
            },
        });
    });
    it('should build gt sql fragment', () => {
        expect(createSQLComparisonBuilder().build('numberType', 'gt', 1)).toEqual({
            numberType: {
                [sequelize_1.Op.gt]: 1,
            },
        });
    });
    it('should build gte sql fragment', () => {
        expect(createSQLComparisonBuilder().build('numberType', 'gte', 1)).toEqual({
            numberType: {
                [sequelize_1.Op.gte]: 1,
            },
        });
    });
    it('should build lt sql fragment', () => {
        expect(createSQLComparisonBuilder().build('numberType', 'lt', 1)).toEqual({
            numberType: {
                [sequelize_1.Op.lt]: 1,
            },
        });
    });
    it('should build lte sql fragment', () => {
        expect(createSQLComparisonBuilder().build('numberType', 'lte', 1)).toEqual({
            numberType: {
                [sequelize_1.Op.lte]: 1,
            },
        });
    });
    it('should build like sql fragment', () => {
        expect(createSQLComparisonBuilder().build('stringType', 'like', '%hello%')).toEqual({
            stringType: {
                [sequelize_1.Op.like]: '%hello%',
            },
        });
    });
    it('should build notLike sql fragment', () => {
        expect(createSQLComparisonBuilder().build('stringType', 'notLike', '%hello%')).toEqual({
            stringType: {
                [sequelize_1.Op.notLike]: '%hello%',
            },
        });
    });
    it('should build iLike sql fragment', () => {
        expect(createSQLComparisonBuilder().build('stringType', 'iLike', '%hello%')).toEqual({
            stringType: {
                [sequelize_1.Op.iLike]: '%hello%',
            },
        });
    });
    it('should build notILike sql fragment', () => {
        expect(createSQLComparisonBuilder().build('stringType', 'notILike', '%hello%')).toEqual({
            stringType: {
                [sequelize_1.Op.notILike]: '%hello%',
            },
        });
    });
    describe('is comparisons', () => {
        it('should build is true', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'is', true)).toEqual({
                boolType: {
                    [sequelize_1.Op.is]: true,
                },
            });
        });
        it('should build is false', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'is', false)).toEqual({
                boolType: {
                    [sequelize_1.Op.is]: false,
                },
            });
        });
        it('should build is null', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'is', null)).toEqual({
                boolType: {
                    [sequelize_1.Op.is]: null,
                },
            });
        });
    });
    describe('isNot comparisons', () => {
        it('should build is true', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'isNot', true)).toEqual({
                boolType: {
                    [sequelize_1.Op.not]: true,
                },
            });
        });
        it('should build is false', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'isNot', false)).toEqual({
                boolType: {
                    [sequelize_1.Op.not]: false,
                },
            });
        });
        it('should build is null', () => {
            expect(createSQLComparisonBuilder().build('boolType', 'isNot', null)).toEqual({
                boolType: {
                    [sequelize_1.Op.not]: null,
                },
            });
        });
    });
    describe('in comparisons', () => {
        it('should build in comparisons', () => {
            const arr = [1, 2, 3];
            expect(createSQLComparisonBuilder().build('numberType', 'in', arr)).toEqual({
                numberType: {
                    [sequelize_1.Op.in]: arr,
                },
            });
        });
    });
    describe('notIn comparisons', () => {
        it('should build notIn comparisons', () => {
            const arr = ['a', 'b', 'c'];
            expect(createSQLComparisonBuilder().build('stringType', 'notIn', arr)).toEqual({
                stringType: {
                    [sequelize_1.Op.notIn]: arr,
                },
            });
        });
    });
    describe('between comparisons', () => {
        it('should build between comparisons', () => {
            const between = { lower: 1, upper: 10 };
            expect(createSQLComparisonBuilder().build('numberType', 'between', between)).toEqual({
                numberType: {
                    [sequelize_1.Op.between]: [between.lower, between.upper],
                },
            });
        });
        it('should throw an error if the comparison is not a between comparison', () => {
            const between = [1, 10];
            expect(() => createSQLComparisonBuilder().build('numberType', 'between', between)).toThrow('Invalid value for between expected {lower: val, upper: val} got [1,10]');
        });
    });
    describe('notBetween comparisons', () => {
        it('should build not between comparisons', () => {
            const between = { lower: 1, upper: 10 };
            expect(createSQLComparisonBuilder().build('numberType', 'notBetween', between)).toEqual({
                numberType: {
                    [sequelize_1.Op.notBetween]: [between.lower, between.upper],
                },
            });
        });
        it('should throw an error if the comparison is not a between comparison', () => {
            const between = [1, 10];
            expect(() => createSQLComparisonBuilder().build('numberType', 'notBetween', between)).toThrow('Invalid value for not between expected {lower: val, upper: val} got [1,10]');
        });
    });
});
//# sourceMappingURL=sql-comparison.builder.spec.js.map