"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const query_graphql_1 = require("@nestjs-query/query-graphql");
let UserDTO = class UserDTO {
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", Number)
], UserDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDTO.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], UserDTO.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], UserDTO.prototype, "updated", void 0);
UserDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('User')
], UserDTO);
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map