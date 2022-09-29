"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const test_entity_1 = require("../__fixtures__/test.entity");
const query_1 = require("../../src/query");
describe('WhereBuilder', () => {
    const createWhereBuilder = () => new query_1.WhereBuilder((0, mongoose_1.model)('TestEntity', test_entity_1.TestEntitySchema));
    const expectFilter = (filter, expectedFilterQuery) => {
        const actual = createWhereBuilder().build(filter);
        expect(actual).toEqual(expectedFilterQuery);
    };
    it('should accept a empty filter', () => {
        expectFilter({}, {});
    });
    it('or multiple operators for a single field together', () => {
        expectFilter({
            numberType: { gt: 10, lt: 20, gte: 21, lte: 31 },
        }, {
            $and: [
                {
                    $or: [
                        { numberType: { $gt: 10 } },
                        { numberType: { $lt: 20 } },
                        { numberType: { $gte: 21 } },
                        { numberType: { $lte: 31 } },
                    ],
                },
            ],
        });
    });
    it('and multiple field comparisons together', () => {
        expectFilter({
            numberType: { eq: 1 },
            stringType: { like: 'foo%' },
            boolType: { is: true },
        }, {
            $and: [
                {
                    $and: [{ numberType: { $eq: 1 } }, { stringType: { $regex: /foo.*/ } }, { boolType: { $eq: true } }],
                },
            ],
        });
    });
    describe('and', () => {
        it('and multiple expressions together', () => {
            expectFilter({
                and: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                $and: [
                    { $and: [{ numberType: { $gt: 10 } }] },
                    { $and: [{ numberType: { $lt: 20 } }] },
                    { $and: [{ numberType: { $gte: 30 } }] },
                    { $and: [{ numberType: { $lte: 40 } }] },
                ],
            });
        });
        it('and multiple filters together with multiple fields', () => {
            expectFilter({
                and: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                $and: [
                    { $and: [{ $and: [{ numberType: { $gt: 10 } }, { stringType: { $regex: /foo.*/ } }] }] },
                    { $and: [{ $and: [{ numberType: { $lt: 20 } }, { stringType: { $regex: /.*bar/ } }] }] },
                ],
            });
        });
        it('should support nested ors', () => {
            expectFilter({
                and: [
                    { or: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { or: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                $and: [
                    {
                        $or: [{ $and: [{ numberType: { $gt: 10 } }] }, { $and: [{ numberType: { $lt: 20 } }] }],
                    },
                    {
                        $or: [{ $and: [{ numberType: { $gte: 30 } }] }, { $and: [{ numberType: { $lte: 40 } }] }],
                    },
                ],
            });
        });
    });
    describe('or', () => {
        it('or multiple expressions together', () => {
            expectFilter({
                or: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                $or: [
                    { $and: [{ numberType: { $gt: 10 } }] },
                    { $and: [{ numberType: { $lt: 20 } }] },
                    { $and: [{ numberType: { $gte: 30 } }] },
                    { $and: [{ numberType: { $lte: 40 } }] },
                ],
            });
        });
        it('and multiple and filters together', () => {
            expectFilter({
                or: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                $or: [
                    {
                        $and: [
                            {
                                $and: [{ numberType: { $gt: 10 } }, { stringType: { $regex: /foo.*/ } }],
                            },
                        ],
                    },
                    {
                        $and: [
                            {
                                $and: [{ numberType: { $lt: 20 } }, { stringType: { $regex: /.*bar/ } }],
                            },
                        ],
                    },
                ],
            });
        });
        it('should support nested ands', () => {
            expectFilter({
                or: [
                    { and: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { and: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                $or: [
                    {
                        $and: [{ $and: [{ numberType: { $gt: 10 } }] }, { $and: [{ numberType: { $lt: 20 } }] }],
                    },
                    {
                        $and: [{ $and: [{ numberType: { $gte: 30 } }] }, { $and: [{ numberType: { $lte: 40 } }] }],
                    },
                ],
            });
        });
    });
});
//# sourceMappingURL=where.builder.spec.js.map