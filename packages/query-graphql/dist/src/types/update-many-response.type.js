"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyResponseType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
/** @internal */
let updateManyResponseType = null;
const UpdateManyResponseType = () => {
    if (updateManyResponseType) {
        return updateManyResponseType;
    }
    let UpdateManyResponseTypeImpl = class UpdateManyResponseTypeImpl {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, { description: 'The number of records updated.' }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], UpdateManyResponseTypeImpl.prototype, "updatedCount", void 0);
    UpdateManyResponseTypeImpl = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('UpdateManyResponse')
    ], UpdateManyResponseTypeImpl);
    updateManyResponseType = UpdateManyResponseTypeImpl;
    return updateManyResponseType;
};
exports.UpdateManyResponseType = UpdateManyResponseType;
//# sourceMappingURL=update-many-response.type.js.map