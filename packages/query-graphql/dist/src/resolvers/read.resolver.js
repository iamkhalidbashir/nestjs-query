"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadResolver = exports.Readable = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = (0, tslib_1.__importDefault)(require("lodash.omit"));
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const types_1 = require("../types");
const resolver_interface_1 = require("./resolver.interface");
const interceptors_1 = require("../interceptors");
const hooks_1 = require("../hooks");
const auth_1 = require("../auth");
/**
 * @internal
 * Mixin to add `read` graphql endpoints.
 */
const Readable = (DTOClass, opts) => (BaseClass) => {
    var _a, _b, _c, _d, _e, _f;
    const { baseNameLower, pluralBaseNameLower, baseName } = (0, common_1.getDTONames)(DTOClass, opts);
    const readOneQueryName = (_b = (_a = opts.one) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : baseNameLower;
    const readManyQueryName = (_d = (_c = opts.many) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : pluralBaseNameLower;
    const { QueryArgs = (0, types_1.QueryArgsType)(DTOClass, { ...opts, connectionName: `${baseName}Connection` }) } = opts;
    const { ConnectionType } = QueryArgs;
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'QueryArgs', 'Connection');
    let QA = class QA extends QueryArgs {
    };
    QA = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], QA);
    let FO = class FO extends (0, types_1.FindOneArgsType)(DTOClass) {
    };
    FO = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], FO);
    let ReadResolverBase = class ReadResolverBase extends BaseClass {
        async findById(input, authorizeFilter) {
            return this.service.findById(input.id, { filter: authorizeFilter });
        }
        async queryMany(query, authorizeFilter) {
            return ConnectionType.createFromPromise((q) => this.service.query(q), (0, core_1.mergeQuery)(query, { filter: authorizeFilter }), (filter) => this.service.count(filter));
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverQuery)(() => DTOClass, { nullable: true, name: readOneQueryName }, commonResolverOpts, { interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_FIND_ONE, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, (_e = opts.one) !== null && _e !== void 0 ? _e : {}),
        (0, tslib_1.__param)(0, (0, decorators_1.HookArgs)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.READ,
            many: false,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [FO, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], ReadResolverBase.prototype, "findById", null);
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverQuery)(() => QueryArgs.ConnectionType.resolveType, { name: readManyQueryName }, commonResolverOpts, { interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_QUERY_MANY, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, (_f = opts.many) !== null && _f !== void 0 ? _f : {}),
        (0, tslib_1.__param)(0, (0, decorators_1.HookArgs)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.READ,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [QA, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], ReadResolverBase.prototype, "queryMany", null);
    ReadResolverBase = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], ReadResolverBase);
    return ReadResolverBase;
};
exports.Readable = Readable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const ReadResolver = (DTOClass, opts = {}) => (0, exports.Readable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.ReadResolver = ReadResolver;
//# sourceMappingURL=read.resolver.js.map