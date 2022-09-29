"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryBuilder = void 0;
const core_1 = require("@nestjs-query/core");
const aggregate_builder_1 = require("./aggregate.builder");
const helpers_1 = require("./helpers");
const where_builder_1 = require("./where.builder");
const MONGOOSE_SORT_DIRECTION = {
    [core_1.SortDirection.ASC]: 1,
    [core_1.SortDirection.DESC]: -1,
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
class FilterQueryBuilder {
    constructor(Model, whereBuilder = new where_builder_1.WhereBuilder(Model), aggregateBuilder = new aggregate_builder_1.AggregateBuilder()) {
        this.Model = Model;
        this.whereBuilder = whereBuilder;
        this.aggregateBuilder = aggregateBuilder;
    }
    buildQuery({ filter, paging, sorting }) {
        return {
            filterQuery: this.buildFilterQuery(filter),
            options: { limit: paging === null || paging === void 0 ? void 0 : paging.limit, skip: paging === null || paging === void 0 ? void 0 : paging.offset, sort: this.buildSorting(sorting) },
        };
    }
    buildAggregateQuery(aggregate, filter) {
        return {
            filterQuery: this.buildFilterQuery(filter),
            aggregate: this.aggregateBuilder.build(aggregate),
            options: { sort: this.buildAggregateSorting(aggregate) },
        };
    }
    buildIdAggregateQuery(id, filter, aggregate) {
        return {
            filterQuery: this.buildIdFilterQuery(id, filter),
            aggregate: this.aggregateBuilder.build(aggregate),
            options: { sort: this.buildAggregateSorting(aggregate) },
        };
    }
    buildIdFilterQuery(id, filter) {
        return {
            ...this.buildFilterQuery(filter),
            _id: Array.isArray(id) ? { $in: id } : id,
        };
    }
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter) {
        if (!filter) {
            return {};
        }
        return this.whereBuilder.build(filter);
    }
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts) {
        if (!sorts) {
            return undefined;
        }
        return sorts.reduce((sort, sortField) => {
            const field = (0, helpers_1.getSchemaKey)(sortField.field.toString());
            const direction = MONGOOSE_SORT_DIRECTION[sortField.direction];
            return { ...sort, [field]: direction };
        }, {});
    }
    buildAggregateSorting(aggregate) {
        const aggregateGroupBy = this.aggregateBuilder.getGroupBySelects(aggregate.groupBy);
        if (!aggregateGroupBy) {
            return undefined;
        }
        return aggregateGroupBy.reduce((sort, sortField) => {
            return { ...sort, [(0, helpers_1.getSchemaKey)(sortField)]: MONGOOSE_SORT_DIRECTION[core_1.SortDirection.ASC] };
        }, {});
    }
}
exports.FilterQueryBuilder = FilterQueryBuilder;
//# sourceMappingURL=filter-query.builder.js.map