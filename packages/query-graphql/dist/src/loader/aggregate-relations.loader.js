"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRelationsLoader = void 0;
class AggregateRelationsLoader {
    constructor(RelationDTO, relationName) {
        this.RelationDTO = RelationDTO;
        this.relationName = relationName;
    }
    createLoader(service) {
        return async (queryArgs) => {
            // group
            const queryMap = this.groupQueries(queryArgs);
            return this.loadResults(service, queryMap);
        };
    }
    async loadResults(service, queryRelationsMap) {
        const results = [];
        await Promise.all([...queryRelationsMap.values()].map(async (args) => {
            const { filter, aggregate } = args[0];
            const dtos = args.map((a) => a.dto);
            const aggregationResults = await service.aggregateRelations(this.RelationDTO, this.relationName, dtos, filter, aggregate);
            const dtoRelationAggregates = dtos.map((dto) => { var _a; return (_a = aggregationResults.get(dto)) !== null && _a !== void 0 ? _a : {}; });
            dtoRelationAggregates.forEach((relationAggregate, index) => {
                results[args[index].index] = relationAggregate;
            });
        }));
        return results;
    }
    groupQueries(queryArgs) {
        // group
        return queryArgs.reduce((map, args, index) => {
            const queryJson = JSON.stringify({ filter: args.filter, aggregate: args.aggregate });
            if (!map.has(queryJson)) {
                map.set(queryJson, []);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            map.get(queryJson).push({ ...args, index });
            return map;
        }, new Map());
    }
}
exports.AggregateRelationsLoader = AggregateRelationsLoader;
//# sourceMappingURL=aggregate-relations.loader.js.map