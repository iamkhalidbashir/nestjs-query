"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReferenceDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let UserReferenceDTO = class UserReferenceDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, graphql_1.Directive)('@external'),
    (0, tslib_1.__metadata)("design:type", Number)
], UserReferenceDTO.prototype, "id", void 0);
UserReferenceDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('User'),
    (0, graphql_1.Directive)('@extends'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], UserReferenceDTO);
exports.UserReferenceDTO = UserReferenceDTO;
//# sourceMappingURL=user-reference.dto.js.map