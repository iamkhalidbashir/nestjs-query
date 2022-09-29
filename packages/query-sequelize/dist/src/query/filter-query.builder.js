"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryBuilder = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const sequelize_1 = (0, tslib_1.__importDefault)(require("sequelize"));
const aggregate_builder_1 = require("./aggregate.builder");
const where_builder_1 = require("./where.builder");
/**
 * @internal
 *
 * Class that will convert a Query into a `sequelize` Query Builder.
 */
class FilterQueryBuilder {
    constructor(model, whereBuilder = new where_builder_1.WhereBuilder(), aggregateBuilder = new aggregate_builder_1.AggregateBuilder(model)) {
        this.model = model;
        this.whereBuilder = whereBuilder;
        this.aggregateBuilder = aggregateBuilder;
    }
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param query - the query to apply.
     */
    findOptions(query) {
        let opts = this.applyAssociationIncludes({ subQuery: false }, query.filter);
        opts = this.applyFilter(opts, query.filter);
        opts = this.applySorting(opts, query.sorting);
        opts = this.applyPaging(opts, query.paging);
        return opts;
    }
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param pk - The primary key(s) of records to find.
     * @param query - the query to apply.
     */
    findByIdOptions(pk, query) {
        var _a;
        let opts = this.applyAssociationIncludes({ subQuery: false }, query.filter);
        opts = this.applyFilter(opts, {
            ...((_a = query.filter) !== null && _a !== void 0 ? _a : {}),
            [this.model.primaryKeyAttribute]: { [Array.isArray(pk) ? 'in' : 'eq']: pk },
        });
        opts = this.applySorting(opts, query.sorting);
        opts = this.applyPaging(opts, query.paging);
        return opts;
    }
    /**
     * Create a `sequelize` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param query - the query to apply.
     * @param aggregate - the aggregate query
     */
    aggregateOptions(query, aggregate) {
        let opts = { raw: true };
        opts = this.applyAggregate(opts, aggregate);
        opts = this.applyFilter(opts, query.filter);
        opts = this.applyAggregateSorting(opts, aggregate.groupBy);
        opts = this.applyGroupBy(opts, aggregate.groupBy);
        return opts;
    }
    relationAggregateOptions(query, aggregate) {
        // joinTableAttributes is used by many-to-many relations and must be empty.
        let opts = { joinTableAttributes: [], raw: true };
        opts = this.applyAggregate(opts, aggregate);
        opts = this.applyFilter(opts, query.filter);
        opts = this.applyAggregateSorting(opts, aggregate.groupBy);
        opts = this.applyGroupBy(opts, aggregate.groupBy);
        return opts;
    }
    countOptions(query) {
        let opts = this.applyAssociationIncludes({}, query.filter);
        opts.distinct = true;
        opts = this.applyFilter(opts, query.filter);
        return opts;
    }
    /**
     * Create a `sequelize` DeleteQueryBuilder with a WHERE clause.
     *
     * @param query - the query to apply.
     */
    destroyOptions(query) {
        let opts = {};
        opts = this.applyFilter(opts, query.filter);
        opts = this.applyPaging(opts, query.paging);
        return opts;
    }
    /**
     * Create a `sequelize` UpdateQueryBuilder with `WHERE` and `ORDER BY` clauses
     *
     * @param query - the query to apply.
     */
    updateOptions(query) {
        let opts = { where: {} };
        opts = this.applyFilter(opts, query.filter);
        opts = this.applyPaging(opts, query.paging);
        return opts;
    }
    /**
     * Applies paging to a Pageable `sequelize` query builder
     * @param qb - the `sequelize` QueryBuilder
     * @param paging - the Paging options.
     */
    applyPaging(qb, paging) {
        if (!paging) {
            return qb;
        }
        if (paging.limit !== undefined) {
            // eslint-disable-next-line no-param-reassign
            qb.limit = paging.limit;
        }
        if (paging.offset !== undefined) {
            // eslint-disable-next-line no-param-reassign
            qb.offset = paging.offset;
        }
        return qb;
    }
    /**
     * Applies the filter from a Query to a `sequelize` QueryBuilder.
     *
     * @param filterable - the `sequelize` QueryBuilder.
     * @param filter - the filter.
     */
    applyFilter(filterable, filter) {
        if (!filter) {
            return filterable;
        }
        // eslint-disable-next-line no-param-reassign
        filterable.where = this.whereBuilder.build(filter, this.getReferencedRelations(filter));
        return filterable;
    }
    /**
     * Applies the ORDER BY clause to a `sequelize` QueryBuilder.
     * @param qb - the `sequelize` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    applySorting(qb, sorts) {
        if (!sorts) {
            return qb;
        }
        // eslint-disable-next-line no-param-reassign
        qb.order = sorts.map(({ field, direction, nulls }) => {
            const col = `${field}`;
            const dir = [direction];
            if (nulls) {
                dir.push(nulls);
            }
            return [col, dir.join(' ')];
        });
        return qb;
    }
    applyAggregate(opts, aggregate) {
        // eslint-disable-next-line no-param-reassign
        opts.attributes = this.aggregateBuilder.build(aggregate).attributes;
        return opts;
    }
    applyGroupBy(qb, groupBy) {
        if (!groupBy) {
            return qb;
        }
        // eslint-disable-next-line no-param-reassign
        qb.group = groupBy.map((field) => {
            const colName = this.model.rawAttributes[field].field;
            return sequelize_1.default.col(colName !== null && colName !== void 0 ? colName : field);
        });
        return qb;
    }
    applyAggregateSorting(qb, groupBy) {
        if (!groupBy) {
            return qb;
        }
        // eslint-disable-next-line no-param-reassign
        qb.order = groupBy.map((field) => {
            const colName = this.model.rawAttributes[field].field;
            const col = sequelize_1.default.col(colName !== null && colName !== void 0 ? colName : field);
            return [col, 'ASC'];
        });
        return qb;
    }
    applyAssociationIncludes(findOpts, filter) {
        if (!filter) {
            return findOpts;
        }
        const referencedRelations = this.getReferencedRelations(filter);
        return [...referencedRelations.values()].reduce((find, association) => {
            const { include = [] } = find;
            // eslint-disable-next-line no-param-reassign
            find.include = [...(Array.isArray(include) ? include : [include]), { association, attributes: [] }];
            return find;
        }, findOpts);
    }
    getReferencedRelations(filter) {
        const { relationNames } = this;
        const referencedFields = (0, core_1.getFilterFields)(filter);
        const referencedRelations = referencedFields.filter((f) => relationNames.includes(f));
        return referencedRelations.reduce((map, r) => map.set(r, this.model.associations[r]), new Map());
    }
    get relationNames() {
        return Object.keys(this.model.associations || {});
    }
}
exports.FilterQueryBuilder = FilterQueryBuilder;
//# sourceMappingURL=filter-query.builder.js.map