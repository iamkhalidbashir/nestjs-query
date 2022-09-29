"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAggregateResponse = exports.transformAggregateQuery = void 0;
const convertAggregateQueryFields = (fieldMap, fields) => {
    if (!fields) {
        return fields;
    }
    return fields.map((fromField) => {
        const otherKey = fieldMap[fromField];
        if (!otherKey) {
            throw new Error(`No corresponding field found for '${fromField}' when transforming aggregateQuery`);
        }
        return otherKey;
    });
};
const convertAggregateNumberFields = (fieldMap, response) => {
    if (!response) {
        return response;
    }
    return Object.keys(response).reduce((toResponse, fromField) => {
        const otherKey = fieldMap[fromField];
        if (!otherKey) {
            throw new Error(`No corresponding field found for '${fromField}' when transforming aggregateQuery`);
        }
        return { ...toResponse, [otherKey]: response[fromField] };
    }, {});
};
const convertAggregateFields = (fieldMap, response) => {
    if (!response) {
        return response;
    }
    return Object.keys(response).reduce((toResponse, fromField) => {
        const otherKey = fieldMap[fromField];
        if (!otherKey) {
            throw new Error(`No corresponding field found for '${fromField}' when transforming aggregateQuery`);
        }
        return { ...toResponse, [otherKey]: response[fromField] };
    }, {});
};
const transformAggregateQuery = (query, fieldMap) => ({
    count: convertAggregateQueryFields(fieldMap, query.count),
    sum: convertAggregateQueryFields(fieldMap, query.sum),
    avg: convertAggregateQueryFields(fieldMap, query.avg),
    max: convertAggregateQueryFields(fieldMap, query.max),
    min: convertAggregateQueryFields(fieldMap, query.min),
});
exports.transformAggregateQuery = transformAggregateQuery;
const transformAggregateResponse = (response, fieldMap) => ({
    count: convertAggregateNumberFields(fieldMap, response.count),
    sum: convertAggregateNumberFields(fieldMap, response.sum),
    avg: convertAggregateNumberFields(fieldMap, response.avg),
    max: convertAggregateFields(fieldMap, response.max),
    min: convertAggregateFields(fieldMap, response.min),
});
exports.transformAggregateResponse = transformAggregateResponse;
//# sourceMappingURL=aggregate.helpers.js.map