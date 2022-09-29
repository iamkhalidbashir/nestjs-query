"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDResolver = void 0;
const aggregate_resolver_1 = require("./aggregate.resolver");
const relations_1 = require("./relations");
const read_resolver_1 = require("./read.resolver");
const create_resolver_1 = require("./create.resolver");
const reference_resolver_1 = require("./reference.resolver");
const update_resolver_1 = require("./update.resolver");
const delete_resolver_1 = require("./delete.resolver");
const common_1 = require("../common");
function extractRelatableOpts(opts) {
    const { enableTotalCount, enableAggregate } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ enableAggregate, enableTotalCount }, opts);
}
function extractAggregateResolverOpts(opts) {
    const { enableAggregate, aggregate } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ enabled: enableAggregate, ...aggregate }, opts);
}
function extractCreateResolverOpts(opts) {
    const { CreateDTOClass, enableSubscriptions, create } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ CreateDTOClass, enableSubscriptions, ...create }, opts);
}
function extractReadResolverOpts(opts) {
    const { enableTotalCount, pagingStrategy, read } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ enableTotalCount, pagingStrategy, ...read }, opts);
}
function extractUpdateResolverOpts(opts) {
    const { UpdateDTOClass, enableSubscriptions, update } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ UpdateDTOClass, enableSubscriptions, ...update }, opts);
}
function extractDeleteResolverOpts(opts) {
    const { enableSubscriptions, delete: deleteArgs } = opts;
    return (0, common_1.mergeBaseResolverOpts)({ enableSubscriptions, ...deleteArgs }, opts);
}
/**
 * Factory to create a resolver that includes all CRUD methods from [[CreateResolver]], [[ReadResolver]],
 * [[UpdateResolver]], and [[DeleteResolver]].
 *
 * ```ts
 * import { CRUDResolver } from '@nestjs-query/query-graphql';
 * import { Resolver } from '@nestjs/graphql';
 * import { TodoItemDTO } from './dto/todo-item.dto';
 * import { TodoItemService } from './todo-item.service';
 *
 * @Resolver()
 * export class TodoItemResolver extends CRUDResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *     super(service);
 *   }
 * }
 * ```
 * @param DTOClass - The DTO Class that the resolver is for. All methods will use types derived from this class.
 * @param opts - Options to customize the resolver.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const CRUDResolver = (DTOClass, opts = {}) => {
    var _a;
    const referencable = (0, reference_resolver_1.Referenceable)(DTOClass, (_a = opts.referenceBy) !== null && _a !== void 0 ? _a : {});
    const relatable = (0, relations_1.Relatable)(DTOClass, extractRelatableOpts(opts));
    const aggregateable = (0, aggregate_resolver_1.Aggregateable)(DTOClass, extractAggregateResolverOpts(opts));
    const creatable = (0, create_resolver_1.Creatable)(DTOClass, extractCreateResolverOpts(opts));
    const readable = (0, read_resolver_1.Readable)(DTOClass, extractReadResolverOpts(opts));
    const updatable = (0, update_resolver_1.Updateable)(DTOClass, extractUpdateResolverOpts(opts));
    const deleteResolver = (0, delete_resolver_1.DeleteResolver)(DTOClass, extractDeleteResolverOpts(opts));
    return referencable(relatable(aggregateable(creatable(readable(updatable(deleteResolver))))));
};
exports.CRUDResolver = CRUDResolver;
//# sourceMappingURL=crud.resolver.js.map