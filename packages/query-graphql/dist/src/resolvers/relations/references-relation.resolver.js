"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferencesRelationsResolver = exports.ReferencesRelationMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const resolver_interface_1 = require("../resolver.interface");
const helpers_1 = require("./helpers");
const pluckFields = (dto, fieldMap) => {
    const partial = {};
    Object.keys(fieldMap).forEach((relationField) => {
        const dtoField = fieldMap[relationField];
        partial[relationField] = dto[dtoField];
    });
    return partial;
};
const allFieldsAreNull = (fields) => {
    return Object.values(fields).reduce((previousNull, value) => previousNull && (value === null || value === undefined), true);
};
const ReferencesMixin = (DTOClass, reference) => (Base) => {
    var _a;
    const commonResolverOpts = (0, helpers_1.removeRelationOpts)(reference);
    const relationDTO = reference.DTO;
    const { baseNameLower, baseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: reference.dtoName });
    let ReadOneMixin = class ReadOneMixin extends Base {
        [_a = `${baseNameLower}Reference`](dto) {
            const fields = pluckFields(dto, reference.keys);
            if (allFieldsAreNull(fields)) {
                return null;
            }
            // eslint-disable-next-line @typescript-eslint/naming-convention
            return { __typename: baseName, ...fields };
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverField)(baseNameLower, () => relationDTO, { nullable: reference.nullable, complexity: reference.complexity }, commonResolverOpts),
        (0, tslib_1.__param)(0, (0, graphql_1.Parent)()),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Object]),
        (0, tslib_1.__metadata)("design:returntype", Object)
    ], ReadOneMixin.prototype, _a, null);
    ReadOneMixin = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], ReadOneMixin);
    return ReadOneMixin;
};
const ReferencesRelationMixin = (DTOClass, references) => (Base) => {
    const flattened = (0, helpers_1.flattenRelations)(references);
    return flattened.reduce((RB, a) => ReferencesMixin(DTOClass, a)(RB), Base);
};
exports.ReferencesRelationMixin = ReferencesRelationMixin;
const ReferencesRelationsResolver = (DTOClass, references) => (0, exports.ReferencesRelationMixin)(DTOClass, references)(resolver_interface_1.BaseServiceResolver);
exports.ReferencesRelationsResolver = ReferencesRelationsResolver;
//# sourceMappingURL=references-relation.resolver.js.map