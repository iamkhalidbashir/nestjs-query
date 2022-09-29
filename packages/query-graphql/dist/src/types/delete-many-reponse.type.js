"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManyResponseType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
/** @internal */
let deleteManyResponseType = null;
const DeleteManyResponseType = () => {
    if (deleteManyResponseType) {
        return deleteManyResponseType;
    }
    let DeleteManyResponseTypeImpl = class DeleteManyResponseTypeImpl {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => graphql_1.Int, { description: 'The number of records deleted.' }),
        (0, tslib_1.__metadata)("design:type", Number)
    ], DeleteManyResponseTypeImpl.prototype, "deletedCount", void 0);
    DeleteManyResponseTypeImpl = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('DeleteManyResponse')
    ], DeleteManyResponseTypeImpl);
    deleteManyResponseType = DeleteManyResponseTypeImpl;
    return deleteManyResponseType;
};
exports.DeleteManyResponseType = DeleteManyResponseType;
//# sourceMappingURL=delete-many-reponse.type.js.map