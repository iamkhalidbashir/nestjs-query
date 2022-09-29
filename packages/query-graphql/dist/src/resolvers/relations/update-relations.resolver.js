"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationsResolver = exports.UpdateRelationsMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const interceptors_1 = require("../../interceptors");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const auth_1 = require("../../auth");
const UpdateOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b;
    if (relation.disableUpdate) {
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
        (0, graphql_1.InputType)(`Set${baseName}On${dtoNames.baseName}Input`)
    ], RIT);
    let SetArgs = class SetArgs extends (0, types_1.MutationArgsType)(RIT) {
    };
    SetArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], SetArgs);
    let UpdateOneMixin = class UpdateOneMixin extends Base {
        async [_b = `set${baseName}On${dtoNames.baseName}`](setArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(SetArgs, setArgs);
            return this.service.setRelation(relationName, input.id, input.relationId, modifyRelationsFilter);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, {}, commonResolverOpts, {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)],
        }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(baseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: false,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [SetArgs, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], UpdateOneMixin.prototype, _b, null);
    UpdateOneMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], UpdateOneMixin);
    return UpdateOneMixin;
};
const UpdateManyRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    var _b, _c;
    if (relation.disableUpdate) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoNames = (0, common_1.getDTONames)(DTOClass);
    const { pluralBaseNameLower, pluralBaseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = (_a = relation.relationName) !== null && _a !== void 0 ? _a : pluralBaseNameLower;
    let AddRelationInput = class AddRelationInput extends (0, types_1.RelationsInputType)(DTOClass, relationDTO) {
    };
    AddRelationInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Add${pluralBaseName}To${dtoNames.baseName}Input`)
    ], AddRelationInput);
    let AddArgs = class AddArgs extends (0, types_1.MutationArgsType)(AddRelationInput) {
    };
    AddArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], AddArgs);
    let SetRelationInput = class SetRelationInput extends (0, types_1.RelationsInputType)(DTOClass, relationDTO) {
    };
    SetRelationInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Set${pluralBaseName}On${dtoNames.baseName}Input`)
    ], SetRelationInput);
    let SetArgs = class SetArgs extends (0, types_1.MutationArgsType)(SetRelationInput) {
    };
    SetArgs = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], SetArgs);
    let UpdateManyMixin = class UpdateManyMixin extends Base {
        async [_b = `add${pluralBaseName}To${dtoNames.baseName}`](addArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(AddArgs, addArgs);
            return this.service.addRelations(relationName, input.id, input.relationIds, modifyRelationsFilter);
        }
        async [_c = `set${pluralBaseName}On${dtoNames.baseName}`](addArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(AddArgs, addArgs);
            return this.service.setRelations(relationName, input.id, input.relationIds, modifyRelationsFilter);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, {}, commonResolverOpts, {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)],
        }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(pluralBaseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [AddArgs, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], UpdateManyMixin.prototype, _b, null);
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, {}, commonResolverOpts, {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)],
        }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(pluralBaseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [SetArgs, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], UpdateManyMixin.prototype, _c, null);
    UpdateManyMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], UpdateManyMixin);
    return UpdateManyMixin;
};
const UpdateRelationsMixin = (DTOClass, relations) => (Base) => {
    var _a, _b;
    const manyRelations = (0, helpers_2.flattenRelations)((_a = relations.many) !== null && _a !== void 0 ? _a : {});
    const oneRelations = (0, helpers_2.flattenRelations)((_b = relations.one) !== null && _b !== void 0 ? _b : {});
    const WithMany = manyRelations.reduce((RB, a) => UpdateManyRelationMixin(DTOClass, a)(RB), Base);
    return oneRelations.reduce((RB, a) => UpdateOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.UpdateRelationsMixin = UpdateRelationsMixin;
const UpdateRelationsResolver = (DTOClass, relations) => (0, exports.UpdateRelationsMixin)(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
exports.UpdateRelationsResolver = UpdateRelationsResolver;
//# sourceMappingURL=update-relations.resolver.js.map