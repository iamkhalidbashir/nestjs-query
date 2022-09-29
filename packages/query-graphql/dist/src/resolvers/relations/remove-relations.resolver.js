"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRelationsResolver = exports.RemoveRelationsMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const auth_1 = require("../../auth");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const interceptors_1 = require("../../interceptors");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const RemoveOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRemove) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoNames = (0, common_1.getDTONames)(DTOClass);
    const { baseNameLower, baseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : baseNameLower;
    let RIT = class RIT extends (0, types_1.RelationInputType)(DTOClass, relationDTO) {
    };
    RIT = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Remove${baseName}From${dtoNames.baseName}Input`)
    ], RIT);
    let SetArgs = class SetArgs extends (0, types_1.MutationArgsType)(RIT) {
    };
    SetArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], SetArgs);
    let RemoveOneMixin = class RemoveOneMixin extends Base {
        async [_b = `remove${baseName}From${dtoNames.baseName}`](setArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(SetArgs, setArgs);
            return this.service.removeRelation(relationName, input.id, input.relationId, modifyRelationsFilter);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, {}, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(baseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: false,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [SetArgs, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], RemoveOneMixin.prototype, _b, null);
    RemoveOneMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], RemoveOneMixin);
    return RemoveOneMixin;
};
const RemoveManyRelationsMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableRemove) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoNames = (0, common_1.getDTONames)(DTOClass);
    const { pluralBaseNameLower, pluralBaseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    let RIT = class RIT extends (0, types_1.RelationsInputType)(DTOClass, relationDTO) {
    };
    RIT = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Remove${pluralBaseName}From${dtoNames.baseName}Input`)
    ], RIT);
    let AddArgs = class AddArgs extends (0, types_1.MutationArgsType)(RIT) {
    };
    AddArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], AddArgs);
    let Mixin = class Mixin extends Base {
        async [_b = `remove${pluralBaseName}From${dtoNames.baseName}`](addArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(AddArgs, addArgs);
            return this.service.removeRelations(relationName, input.id, input.relationIds, modifyRelationsFilter);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, {}, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(pluralBaseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [AddArgs, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], Mixin.prototype, _b, null);
    Mixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], Mixin);
    return Mixin;
};
const RemoveRelationsMixin = (DTOClass, relations) => (Base) => {
    var _a, _b;
    const manyRelations = (0, helpers_2.flattenRelations)((_a = relations.many) !== null && _a !== void 0 ? _a : {});
    const oneRelations = (0, helpers_2.flattenRelations)((_b = relations.one) !== null && _b !== void 0 ? _b : {});
    const WithMany = manyRelations.reduce((RB, a) => RemoveManyRelationsMixin(DTOClass, a)(RB), Base);
    return oneRelations.reduce((RB, a) => RemoveOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.RemoveRelationsMixin = RemoveRelationsMixin;
const RemoveRelationsResolver = (DTOClass, relations) => (0, exports.RemoveRelationsMixin)(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
exports.RemoveRelationsResolver = RemoveRelationsResolver;
//# sourceMappingURL=remove-relations.resolver.js.map