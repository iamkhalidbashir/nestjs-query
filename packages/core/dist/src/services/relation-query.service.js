"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationQueryService = void 0;
const helpers_1 = require("../helpers");
const noop_query_service_1 = require("./noop-query.service");
const proxy_query_service_1 = require("./proxy-query.service");
class RelationQueryService extends proxy_query_service_1.ProxyQueryService {
    constructor(queryService, relations) {
        if (typeof queryService.query === 'function') {
            super(queryService);
            this.relations = relations;
        }
        else {
            super(noop_query_service_1.NoOpQueryService.getInstance());
            this.relations = queryService;
        }
    }
    async queryRelations(RelationClass, relationName, dto, query) {
        const serviceRelation = this.getRelation(relationName);
        if (!serviceRelation) {
            if (Array.isArray(dto)) {
                return super.queryRelations(RelationClass, relationName, dto, query);
            }
            return super.queryRelations(RelationClass, relationName, dto, query);
        }
        const { query: qf, service } = serviceRelation;
        if (Array.isArray(dto)) {
            const map = new Map();
            await Promise.all(dto.map(async (d) => {
                const relations = await service.query((0, helpers_1.mergeQuery)(query, qf(d)));
                map.set(d, relations);
            }));
            return map;
        }
        return service.query((0, helpers_1.mergeQuery)(query, qf(dto)));
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        var _a;
        const serviceRelation = this.getRelation(relationName);
        if (!serviceRelation) {
            if (Array.isArray(dto)) {
                return super.aggregateRelations(RelationClass, relationName, dto, filter, aggregate);
            }
            return super.aggregateRelations(RelationClass, relationName, dto, filter, aggregate);
        }
        const { query: qf, service } = serviceRelation;
        if (Array.isArray(dto)) {
            const map = new Map();
            await Promise.all(dto.map(async (d) => {
                var _a;
                const relations = await service.aggregate((_a = (0, helpers_1.mergeQuery)({ filter }, qf(d)).filter) !== null && _a !== void 0 ? _a : {}, aggregate);
                map.set(d, relations);
            }));
            return map;
        }
        return service.aggregate((_a = (0, helpers_1.mergeQuery)({ filter }, qf(dto)).filter) !== null && _a !== void 0 ? _a : {}, aggregate);
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        const serviceRelation = this.getRelation(relationName);
        if (!serviceRelation) {
            if (Array.isArray(dto)) {
                return super.countRelations(RelationClass, relationName, dto, filter);
            }
            return super.countRelations(RelationClass, relationName, dto, filter);
        }
        const { query: qf, service } = serviceRelation;
        if (Array.isArray(dto)) {
            const map = new Map();
            await Promise.all(dto.map(async (d) => {
                const count = await service.count((0, helpers_1.mergeQuery)({ filter }, qf(d)).filter || {});
                map.set(d, count);
            }));
            return map;
        }
        return service.count((0, helpers_1.mergeQuery)({ filter }, qf(dto)).filter || {});
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        const serviceRelation = this.getRelation(relationName);
        if (!serviceRelation) {
            if (Array.isArray(dto)) {
                return super.findRelation(RelationClass, relationName, dto, opts);
            }
            return super.findRelation(RelationClass, relationName, dto, opts);
        }
        const { query: qf, service } = serviceRelation;
        if (Array.isArray(dto)) {
            const map = new Map();
            await Promise.all(dto.map(async (d) => {
                const relation = await service.query((0, helpers_1.mergeQuery)(qf(d), { paging: { limit: 1 }, filter: opts === null || opts === void 0 ? void 0 : opts.filter }));
                map.set(d, relation[0]);
            }));
            return map;
        }
        return (await service.query((0, helpers_1.mergeQuery)(qf(dto), { paging: { limit: 1 }, filter: opts === null || opts === void 0 ? void 0 : opts.filter })))[0];
    }
    getRelation(name) {
        const relation = this.relations[name];
        if (relation) {
            return relation;
        }
        return undefined;
    }
}
exports.RelationQueryService = RelationQueryService;
//# sourceMappingURL=relation-query.service.js.map