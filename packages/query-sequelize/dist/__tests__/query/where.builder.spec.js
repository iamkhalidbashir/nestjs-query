"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const query_1 = require("../../src/query");
describe('WhereBuilder', () => {
    const createWhereBuilder = () => new query_1.WhereBuilder();
    const expectWhereQuery = (filter, expectedWhereOpts) => {
        const actual = createWhereBuilder().build(filter, new Map());
        expect(actual).toEqual(expectedWhereOpts);
    };
    it('should accept a empty filter', () => {
        expectWhereQuery({}, {});
    });
    it('or multiple operators for a single field together', () => {
        expectWhereQuery({
            numberType: { gt: 10, lt: 20, gte: 21, lte: 31 },
        }, {
            [sequelize_1.Op.and]: [
                {
                    [sequelize_1.Op.or]: [
                        { numberType: { [sequelize_1.Op.gt]: 10 } },
                        { numberType: { [sequelize_1.Op.lt]: 20 } },
                        { numberType: { [sequelize_1.Op.gte]: 21 } },
                        { numberType: { [sequelize_1.Op.lte]: 31 } },
                    ],
                },
            ],
        });
    });
    it('and multiple field comparisons together', () => {
        expectWhereQuery({
            numberType: { gt: 1 },
            stringType: { like: 'foo%' },
        }, {
            [sequelize_1.Op.and]: [
                {
                    [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 1 } }, { stringType: { [sequelize_1.Op.like]: 'foo%' } }],
                },
            ],
        });
    });
    describe('and', () => {
        it('and multiple expressions together', () => {
            expectWhereQuery({
                and: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                [sequelize_1.Op.and]: [
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gte]: 30 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lte]: 40 } }] },
                ],
            });
        });
        it('and multiple filters together with multiple fields', () => {
            expectWhereQuery({
                and: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                [sequelize_1.Op.and]: [
                    { [sequelize_1.Op.and]: [{ [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }, { stringType: { [sequelize_1.Op.like]: 'foo%' } }] }] },
                    { [sequelize_1.Op.and]: [{ [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }, { stringType: { [sequelize_1.Op.like]: '%bar' } }] }] },
                ],
            });
        });
        it('should support nested ors', () => {
            expectWhereQuery({
                and: [
                    { or: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { or: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                [sequelize_1.Op.and]: [
                    {
                        [sequelize_1.Op.or]: [
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }] },
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }] },
                        ],
                    },
                    {
                        [sequelize_1.Op.or]: [
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gte]: 30 } }] },
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lte]: 40 } }] },
                        ],
                    },
                ],
            });
        });
    });
    describe('or', () => {
        it('or multiple expressions together', () => {
            expectWhereQuery({
                or: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                [sequelize_1.Op.or]: [
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gte]: 30 } }] },
                    { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lte]: 40 } }] },
                ],
            });
        });
        it('and multiple and filters together', () => {
            expectWhereQuery({
                or: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [
                            {
                                [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }, { stringType: { [sequelize_1.Op.like]: 'foo%' } }],
                            },
                        ],
                    },
                    {
                        [sequelize_1.Op.and]: [
                            {
                                [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }, { stringType: { [sequelize_1.Op.like]: '%bar' } }],
                            },
                        ],
                    },
                ],
            });
        });
        it('should support nested ands', () => {
            expectWhereQuery({
                or: [
                    { and: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { and: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gt]: 10 } }] },
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lt]: 20 } }] },
                        ],
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.gte]: 30 } }] },
                            { [sequelize_1.Op.and]: [{ numberType: { [sequelize_1.Op.lte]: 40 } }] },
                        ],
                    },
                ],
            });
        });
    });
});
//# sourceMappingURL=where.builder.spec.js.map