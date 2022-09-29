"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateResolver = exports.Aggregateable = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = (0, tslib_1.__importDefault)(require("lodash.omit"));
const interceptors_1 = require("../interceptors");
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const types_1 = require("../types");
const helpers_1 = require("./helpers");
const resolver_interface_1 = require("./resolver.interface");
const auth_1 = require("../auth");
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
const Aggregateable = (DTOClass, opts) => (BaseClass) => {
    const { baseNameLower } = (0, common_1.getDTONames)(DTOClass);
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'QueryArgs', 'Connection');
    const queryName = `${baseNameLower}Aggregate`;
    const AR = (0, types_1.AggregateResponseType)(DTOClass);
    let AA = class AA extends (0, types_1.AggregateArgsType)(DTOClass) {
    };
    AA = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], AA);
    let AggregateResolverBase = class AggregateResolverBase extends BaseClass {
        async aggregate(args, query, authFilter) {
            const qa = await (0, helpers_1.transformAndValidate)(AA, args);
            return this.service.aggregate((0, core_1.mergeFilter)(qa.filter || {}, authFilter !== null && authFilter !== void 0 ? authFilter : {}), query);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.SkipIf)(() => !opts || !opts.enabled, (0, decorators_1.ResolverQuery)(() => [AR], { name: queryName }, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, opts !== null && opts !== void 0 ? opts : {})),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AggregateQueryParam)()),
        (0, tslib_1.__param)(2, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.AGGREGATE,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [AA, Object, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], AggregateResolverBase.prototype, "aggregate", null);
    AggregateResolverBase = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => AR, { isAbstract: true })
    ], AggregateResolverBase);
    return AggregateResolverBase;
};
exports.Aggregateable = Aggregateable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const AggregateResolver = (DTOClass, opts) => (0, exports.Aggregateable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.AggregateResolver = AggregateResolver;
//# sourceMappingURL=aggregate.resolver.js.map