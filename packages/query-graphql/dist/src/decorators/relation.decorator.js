"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterableCursorConnection = exports.CursorConnection = exports.FilterableOffsetConnection = exports.OffsetConnection = exports.FilterableUnPagedRelation = exports.UnPagedRelation = exports.FilterableRelation = exports.Relation = exports.getRelations = exports.reflector = void 0;
const core_1 = require("@nestjs-query/core");
const paging_1 = require("../types/query/paging");
const constants_1 = require("./constants");
const common_1 = require("../common");
exports.reflector = new core_1.ArrayReflector(constants_1.RELATION_KEY);
function getRelationsDescriptors(DTOClass) {
    return (0, core_1.getPrototypeChain)(DTOClass).reduce((relations, cls) => {
        var _a;
        const relationNames = relations.map((t) => t.name);
        const metaRelations = (_a = exports.reflector.get(cls)) !== null && _a !== void 0 ? _a : [];
        const inheritedRelations = metaRelations.filter((t) => !relationNames.includes(t.name));
        return [...inheritedRelations, ...relations];
    }, []);
}
function convertRelationsToOpts(relations, baseOpts) {
    const relationOpts = {};
    relations.forEach((r) => {
        const DTO = r.relationTypeFunc();
        const opts = (0, common_1.mergeBaseResolverOpts)({ ...r.relationOpts, DTO }, baseOpts !== null && baseOpts !== void 0 ? baseOpts : {});
        if (r.isMany) {
            relationOpts.many = { ...relationOpts.many, [r.name]: opts };
        }
        else {
            relationOpts.one = { ...relationOpts.one, [r.name]: opts };
        }
    });
    return relationOpts;
}
function getRelations(DTOClass, opts) {
    const relationDescriptors = getRelationsDescriptors(DTOClass);
    return convertRelationsToOpts(relationDescriptors, opts);
}
exports.getRelations = getRelations;
const relationDecorator = (isMany, allowFiltering, pagingStrategy) => (name, relationTypeFunc, options) => (DTOClass) => {
    exports.reflector.append(DTOClass, {
        name,
        isMany,
        relationOpts: { pagingStrategy, allowFiltering, ...options },
        relationTypeFunc,
    });
    return DTOClass;
};
exports.Relation = relationDecorator(false, false);
exports.FilterableRelation = relationDecorator(false, true);
exports.UnPagedRelation = relationDecorator(true, false, paging_1.PagingStrategies.NONE);
exports.FilterableUnPagedRelation = relationDecorator(true, true, paging_1.PagingStrategies.NONE);
exports.OffsetConnection = relationDecorator(true, false, paging_1.PagingStrategies.OFFSET);
exports.FilterableOffsetConnection = relationDecorator(true, true, paging_1.PagingStrategies.OFFSET);
exports.CursorConnection = relationDecorator(true, false, paging_1.PagingStrategies.CURSOR);
exports.FilterableCursorConnection = relationDecorator(true, true, paging_1.PagingStrategies.CURSOR);
//# sourceMappingURL=relation.decorator.js.map