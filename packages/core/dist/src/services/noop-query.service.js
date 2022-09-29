"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOpQueryService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
class NoOpQueryService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getInstance() {
        return this.instance;
    }
    addRelations(relationName, id, relationIds, opts) {
        return Promise.reject(new common_1.NotImplementedException('addRelations is not implemented'));
    }
    createMany(items) {
        return Promise.reject(new common_1.NotImplementedException('createMany is not implemented'));
    }
    createOne(item) {
        return Promise.reject(new common_1.NotImplementedException('createOne is not implemented'));
    }
    deleteMany(filter) {
        return Promise.reject(new common_1.NotImplementedException('deleteMany is not implemented'));
    }
    deleteOne(id, opts) {
        return Promise.reject(new common_1.NotImplementedException('deleteOne is not implemented'));
    }
    findById(id, opts) {
        return Promise.reject(new common_1.NotImplementedException('findById is not implemented'));
    }
    findRelation(RelationClass, relationName, dto, opts) {
        return Promise.reject(new common_1.NotImplementedException('findRelation is not implemented'));
    }
    getById(id, opts) {
        return Promise.reject(new common_1.NotImplementedException('getById is not implemented'));
    }
    query(query) {
        return Promise.reject(new common_1.NotImplementedException('query is not implemented'));
    }
    aggregate(filter, aggregate) {
        return Promise.reject(new common_1.NotImplementedException('aggregate is not implemented'));
    }
    count(filter) {
        return Promise.reject(new common_1.NotImplementedException('count is not implemented'));
    }
    queryRelations(RelationClass, relationName, dto, query) {
        return Promise.reject(new common_1.NotImplementedException('queryRelations is not implemented'));
    }
    countRelations(RelationClass, relationName, dto, filter) {
        return Promise.reject(new common_1.NotImplementedException('countRelations is not implemented'));
    }
    removeRelation(relationName, id, relationId, opts) {
        return Promise.reject(new common_1.NotImplementedException('removeRelation is not implemented'));
    }
    removeRelations(relationName, id, relationIds, opts) {
        return Promise.reject(new common_1.NotImplementedException('removeRelations is not implemented'));
    }
    setRelations(relationName, id, relationId, opts) {
        return Promise.reject(new common_1.NotImplementedException('setRelations is not implemented'));
    }
    setRelation(relationName, id, relationId, opts) {
        return Promise.reject(new common_1.NotImplementedException('setRelation is not implemented'));
    }
    updateMany(update, filter) {
        return Promise.reject(new common_1.NotImplementedException('updateMany is not implemented'));
    }
    updateOne(id, update, opts) {
        return Promise.reject(new common_1.NotImplementedException('updateOne is not implemented'));
    }
    aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        return Promise.reject(new common_1.NotImplementedException('aggregateRelations is not implemented'));
    }
}
exports.NoOpQueryService = NoOpQueryService;
NoOpQueryService.instance = new NoOpQueryService();
//# sourceMappingURL=noop-query.service.js.map