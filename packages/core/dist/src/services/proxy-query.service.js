"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyQueryService = void 0;
class ProxyQueryService {
    constructor(proxied) {
        this.proxied = proxied;
    }
    addRelations(relationName, id, relationIds, opts) {
        return this.proxied.addRelations(relationName, id, relationIds, opts);
    }
    removeRelation(relationName, id, relationId, opts) {
        return this.proxied.removeRelation(relationName, id, relationId, opts);
    }
    removeRelations(relationName, id, relationIds, opts) {
        return this.proxied.removeRelations(relationName, id, relationIds, opts);
    }
    setRelations(relationName, id, relationIds, opts) {
        return this.proxied.setRelations(relationName, id, relationIds, opts);
    }
    setRelation(relationName, id, relationId, opts) {
        return this.proxied.setRelation(relationName, id, relationId, opts);
    }
    async queryRelations(RelationClass, relationName, dto, query) {
        if (Array.isArray(dto)) {
            return this.proxied.queryRelations(RelationClass, relationName, dto, query);
        }
        return this.proxied.queryRelations(RelationClass, relationName, dto, query);
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        if (Array.isArray(dto)) {
            return this.proxied.countRelations(RelationClass, relationName, dto, filter);
        }
        return this.proxied.countRelations(RelationClass, relationName, dto, filter);
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        if (Array.isArray(dto)) {
            return this.proxied.findRelation(RelationClass, relationName, dto, opts);
        }
        return this.proxied.findRelation(RelationClass, relationName, dto, opts);
    }
    createMany(items) {
        return this.proxied.createMany(items);
    }
    createOne(item) {
        return this.proxied.createOne(item);
    }
    async deleteMany(filter) {
        return this.proxied.deleteMany(filter);
    }
    deleteOne(id, opts) {
        return this.proxied.deleteOne(id, opts);
    }
    async findById(id, opts) {
        return this.proxied.findById(id, opts);
    }
    getById(id, opts) {
        return this.proxied.getById(id, opts);
    }
    query(query) {
        return this.proxied.query(query);
    }
    aggregate(filter, query) {
        return this.proxied.aggregate(filter, query);
    }
    count(filter) {
        return this.proxied.count(filter);
    }
    updateMany(update, filter) {
        return this.proxied.updateMany(update, filter);
    }
    updateOne(id, update, opts) {
        return this.proxied.updateOne(id, update, opts);
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        if (Array.isArray(dto)) {
            return this.proxied.aggregateRelations(RelationClass, relationName, dto, filter, aggregate);
        }
        return this.proxied.aggregateRelations(RelationClass, relationName, dto, filter, aggregate);
    }
}
exports.ProxyQueryService = ProxyQueryService;
//# sourceMappingURL=proxy-query.service.js.map