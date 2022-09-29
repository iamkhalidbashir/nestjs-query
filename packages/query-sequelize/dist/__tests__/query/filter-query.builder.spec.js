"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ts_mockito_1 = require("ts-mockito");
const core_1 = require("@nestjs-query/core");
const test_entity_1 = require("../__fixtures__/test.entity");
const query_1 = require("../../src/query");
describe('FilterQueryBuilder', () => {
    const getEntityQueryBuilder = (whereBuilder) => new query_1.FilterQueryBuilder(test_entity_1.TestEntity, whereBuilder);
    describe('#select', () => {
        const expectFindOptions = (query, whereBuilder, expectedFindOptions) => {
            expect(getEntityQueryBuilder(whereBuilder).findOptions(query)).toEqual({
                ...expectedFindOptions,
                subQuery: false,
            });
        };
        describe('with filter', () => {
            it('should not call whereBuilder#build', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({}, (0, ts_mockito_1.instance)(mockWhereBuilder), {});
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should call whereBuilder#build if there is a filter', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                const query = { filter: { stringType: { eq: 'foo' } } };
                (0, ts_mockito_1.when)(mockWhereBuilder.build(query.filter, (0, ts_mockito_1.deepEqual)(new Map()))).thenCall(() => ({
                    [sequelize_1.Op.and]: { stringType: 'foo' },
                }));
                expectFindOptions(query, (0, ts_mockito_1.instance)(mockWhereBuilder), {
                    where: { [sequelize_1.Op.and]: { stringType: 'foo' } },
                });
            });
        });
        describe('with paging', () => {
            it('should apply empty paging args', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({}, (0, ts_mockito_1.instance)(mockWhereBuilder), {});
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply paging args going forward', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    paging: {
                        limit: 10,
                        offset: 11,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { limit: 10, offset: 11 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply paging args going backward', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    paging: {
                        limit: 10,
                        offset: 10,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { limit: 10, offset: 10 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply paging with just a limit', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    paging: {
                        limit: 10,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { limit: 10 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply paging with just an offset', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    paging: {
                        offset: 10,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { offset: 10 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
        });
        describe('with sorting', () => {
            it('should apply ASC sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.ASC }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'ASC']] });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply ASC NULLS_FIRST sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_FIRST }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'ASC NULLS FIRST']] });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply ASC NULLS_LAST sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_LAST }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'ASC NULLS LAST']] });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply DESC sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.DESC }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'DESC']] });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply DESC NULLS_FIRST sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.DESC, nulls: core_1.SortNulls.NULLS_FIRST }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'DESC NULLS FIRST']] });
            });
            it('should apply DESC NULLS_LAST sorting', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [{ field: 'numberType', direction: core_1.SortDirection.DESC, nulls: core_1.SortNulls.NULLS_LAST }],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { order: [['numberType', 'DESC NULLS LAST']] });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
            it('should apply multiple sorts', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectFindOptions({
                    sorting: [
                        { field: 'numberType', direction: core_1.SortDirection.ASC },
                        { field: 'boolType', direction: core_1.SortDirection.DESC },
                        { field: 'stringType', direction: core_1.SortDirection.ASC, nulls: core_1.SortNulls.NULLS_FIRST },
                        { field: 'dateType', direction: core_1.SortDirection.DESC, nulls: core_1.SortNulls.NULLS_LAST },
                    ],
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), {
                    order: [
                        ['numberType', 'ASC'],
                        ['boolType', 'DESC'],
                        ['stringType', 'ASC NULLS FIRST'],
                        ['dateType', 'DESC NULLS LAST'],
                    ],
                });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
        });
    });
    describe('#update', () => {
        const expectUpdateOptions = (query, whereBuilder, expectedUpdateOptions) => {
            expect(getEntityQueryBuilder(whereBuilder).updateOptions(query)).toEqual(expectedUpdateOptions);
        };
        describe('with filter', () => {
            it('should call whereBuilder#build if there is a filter', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                const query = { filter: { stringType: { eq: 'foo' } } };
                (0, ts_mockito_1.when)(mockWhereBuilder.build(query.filter, (0, ts_mockito_1.deepEqual)(new Map()))).thenCall(() => ({
                    [sequelize_1.Op.and]: { stringType: 'foo' },
                }));
                expectUpdateOptions(query, (0, ts_mockito_1.instance)(mockWhereBuilder), {
                    where: { [sequelize_1.Op.and]: { stringType: 'foo' } },
                });
            });
        });
        describe('with paging', () => {
            it('should ignore paging args', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectUpdateOptions({
                    paging: {
                        limit: 10,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { where: {}, limit: 10 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
        });
    });
    describe('#delete', () => {
        const expectDestroyOptions = (query, whereBuilder, expectedDestroyOptions) => {
            expect(getEntityQueryBuilder(whereBuilder).destroyOptions(query)).toEqual(expectedDestroyOptions);
        };
        describe('with filter', () => {
            it('should call whereBuilder#build if there is a filter', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                const query = { filter: { stringType: { eq: 'foo' } } };
                (0, ts_mockito_1.when)(mockWhereBuilder.build(query.filter, (0, ts_mockito_1.deepEqual)(new Map()))).thenCall(() => ({
                    [sequelize_1.Op.and]: { stringType: 'foo' },
                }));
                expectDestroyOptions(query, (0, ts_mockito_1.instance)(mockWhereBuilder), {
                    where: { [sequelize_1.Op.and]: { stringType: 'foo' } },
                });
            });
        });
        describe('with paging', () => {
            it('should include limit', () => {
                const mockWhereBuilder = (0, ts_mockito_1.mock)(query_1.WhereBuilder);
                expectDestroyOptions({
                    paging: {
                        limit: 10,
                    },
                }, (0, ts_mockito_1.instance)(mockWhereBuilder), { limit: 10 });
                (0, ts_mockito_1.verify)(mockWhereBuilder.build((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            });
        });
    });
});
//# sourceMappingURL=filter-query.builder.spec.js.map