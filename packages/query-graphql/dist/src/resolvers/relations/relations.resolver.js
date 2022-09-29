"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relatable = void 0;
const aggregate_relations_resolver_1 = require("./aggregate-relations.resolver");
const read_relations_resolver_1 = require("./read-relations.resolver");
const references_relation_resolver_1 = require("./references-relation.resolver");
const remove_relations_resolver_1 = require("./remove-relations.resolver");
const update_relations_resolver_1 = require("./update-relations.resolver");
const decorators_1 = require("../../decorators");
const reference_decorator_1 = require("../../decorators/reference.decorator");
const Relatable = (DTOClass, opts) => (Base) => {
    const { enableTotalCount, enableAggregate } = opts;
    const relations = (0, decorators_1.getRelations)(DTOClass, opts);
    const references = (0, reference_decorator_1.getReferences)(DTOClass, opts);
    const referencesMixin = (0, references_relation_resolver_1.ReferencesRelationMixin)(DTOClass, references);
    const aggregateRelationsMixin = (0, aggregate_relations_resolver_1.AggregateRelationsMixin)(DTOClass, { ...relations, enableAggregate });
    const readRelationsMixin = (0, read_relations_resolver_1.ReadRelationsMixin)(DTOClass, { ...relations, enableTotalCount });
    const updateRelationsMixin = (0, update_relations_resolver_1.UpdateRelationsMixin)(DTOClass, relations);
    return referencesMixin(aggregateRelationsMixin(readRelationsMixin(updateRelationsMixin((0, remove_relations_resolver_1.RemoveRelationsMixin)(DTOClass, relations)(Base)))));
};
exports.Relatable = Relatable;
//# sourceMappingURL=relations.resolver.js.map