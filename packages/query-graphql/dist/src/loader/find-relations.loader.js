"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRelationsLoader = void 0;
class FindRelationsLoader {
    constructor(RelationDTO, relationName) {
        this.RelationDTO = RelationDTO;
        this.relationName = relationName;
    }
    createLoader(service) {
        return async (args) => {
            const grouped = this.groupFinds(args);
            return this.loadResults(service, grouped);
        };
    }
    async loadResults(service, findRelationsMap) {
        const results = [];
        await Promise.all([...findRelationsMap.values()].map(async (args) => {
            const { filter } = args[0];
            const dtos = args.map((a) => a.dto);
            const relationResults = await service.findRelation(this.RelationDTO, this.relationName, dtos, { filter });
            const dtoRelations = dtos.map((dto) => relationResults.get(dto));
            dtoRelations.forEach((relation, index) => {
                results[args[index].index] = relation;
            });
        }));
        return results;
    }
    groupFinds(queryArgs) {
        // group
        return queryArgs.reduce((map, args, index) => {
            const filterJson = JSON.stringify(args.filter);
            if (!map.has(filterJson)) {
                map.set(filterJson, []);
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            map.get(filterJson).push({ ...args, index });
            return map;
        }, new Map());
    }
}
exports.FindRelationsLoader = FindRelationsLoader;
//# sourceMappingURL=find-relations.loader.js.map