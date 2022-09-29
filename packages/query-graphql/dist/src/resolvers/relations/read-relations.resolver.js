"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadRelationsResolver = exports.ReadRelationsMixin = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const auth_1 = require("../../auth");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const interceptors_1 = require("../../interceptors");
const loader_1 = require("../../loader");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const ReadOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRead) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const { baseNameLower, baseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : baseNameLower;
    const loaderName = `load${baseName}For${DTOClass.name}`;
    const findLoader = new loader_1.FindRelationsLoader(relationDTO, relationName);
    let ReadOneMixin = class ReadOneMixin extends Base {
        async [_b = `find${baseName}`](dto, context, authFilter) {
            return loader_1.DataLoaderFactory.getOrCreateLoader(context, loaderName, findLoader.createLoader(this.service)).load({
                dto,
                filter: authFilter,
            });
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverField)(baseNameLower, () => relationDTO, { nullable: relation.nullable, complexity: relation.complexity }, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }),
        (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
        (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
        (0, tslib_1.__param)(2, (0, decorators_1.RelationAuthorizerFilter)(baseNameLower, {
            operationGroup: auth_1.OperationGroup.READ,
            many: false,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Object, Object, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], ReadOneMixin.prototype, _b, null);
    ReadOneMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], ReadOneMixin);
    return ReadOneMixin;
};
const ReadManyRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRead) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoName = (0, common_1.getDTONames)(DTOClass).baseName;
    const { pluralBaseNameLower, pluralBaseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    const relationLoaderName = `load${pluralBaseName}For${DTOClass.name}`;
    const countRelationLoaderName = `count${pluralBaseName}For${DTOClass.name}`;
    const queryLoader = new loader_1.QueryRelationsLoader(relationDTO, relationName);
    const countLoader = new loader_1.CountRelationsLoader(relationDTO, relationName);
    const connectionName = `${dtoName}${pluralBaseName}Connection`;
    let RelationQA = class RelationQA extends (0, types_1.QueryArgsType)(relationDTO, {
        ...relation,
        connectionName,
        disableKeySetPagination: true,
    }) {
    };
    RelationQA = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], RelationQA);
    // disable keyset pagination for relations otherwise recursive paging will not work
    const { ConnectionType: CT } = RelationQA;
    let ReadManyMixin = class ReadManyMixin extends Base {
        async [_b = `query${pluralBaseName}`](dto, q, context, relationFilter) {
            const qa = await (0, helpers_1.transformAndValidate)(RelationQA, q);
            const relationLoader = loader_1.DataLoaderFactory.getOrCreateLoader(context, relationLoaderName, queryLoader.createLoader(this.service));
            const relationCountLoader = loader_1.DataLoaderFactory.getOrCreateLoader(context, countRelationLoaderName, countLoader.createLoader(this.service));
            return CT.createFromPromise((query) => relationLoader.load({ dto, query }), (0, core_1.mergeQuery)(qa, { filter: relationFilter }), (filter) => relationCountLoader.load({ dto, filter }));
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverField)(pluralBaseNameLower, () => CT.resolveType, { nullable: relation.nullable, complexity: relation.complexity }, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }),
        (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
        (0, tslib_1.__param)(1, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(2, (0, graphql_1.Context)()),
        (0, tslib_1.__param)(3, (0, decorators_1.RelationAuthorizerFilter)(pluralBaseNameLower, {
            operationGroup: auth_1.OperationGroup.READ,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Object, RelationQA, Object, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], ReadManyMixin.prototype, _b, null);
    ReadManyMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], ReadManyMixin);
    return ReadManyMixin;
};
const ReadRelationsMixin = (DTOClass, relations) => (Base) => {
    const { many, one, enableTotalCount } = relations;
    const manyRelations = (0, helpers_2.flattenRelations)(many !== null && many !== void 0 ? many : {});
    const oneRelations = (0, helpers_2.flattenRelations)(one !== null && one !== void 0 ? one : {});
    const WithMany = manyRelations.reduce((RB, a) => ReadManyRelationMixin(DTOClass, { enableTotalCount, ...a })(RB), Base);
    return oneRelations.reduce((RB, a) => ReadOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.ReadRelationsMixin = ReadRelationsMixin;
const ReadRelationsResolver = (DTOClass, relations) => (0, exports.ReadRelationsMixin)(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
exports.ReadRelationsResolver = ReadRelationsResolver;
//# sourceMappingURL=read-relations.resolver.js.map