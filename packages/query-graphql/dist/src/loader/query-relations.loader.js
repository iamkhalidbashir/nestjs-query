"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRelationsLoader = void 0;
class QueryRelationsLoader {
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
            const { query } = args[0];
            const dtos = args.map((a) => a.dto);
            const relationResults = await service.queryRelations(this.RelationDTO, this.relationName, dtos, query);
            const dtoRelations = dtos.map((dto) => { var _a; return (_a = relationResults.get(dto)) !== null && _a !== void 0 ? _a : []; });
            dtoRelations.forEach((relations, index) => {
                results[args[index].index] = relations;
            });
        }));
        return results;
    }
    groupQueries(queryArgs) {
        // group
        return queryArgs.reduce((map, args, index) => {
            const queryJson = JSON.stringify(args.query);
            if (!map.has(queryJson)) {
                map.set(queryJson, []);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            map.get(queryJson).push({ ...args, index });
            return map;
        }, new Map());
    }
}
exports.QueryRelationsLoader = QueryRelationsLoader;
//# sourceMappingURL=query-relations.loader.js.map