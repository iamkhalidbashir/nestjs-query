"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRelationDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const src_1 = require("../../src");
let TestRelationDTO = class TestRelationDTO {
};
(0, tslib_1.__decorate)([
    (0, src_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", String)
], TestRelationDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, src_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], TestRelationDTO.prototype, "testResolverId", void 0);
TestRelationDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], TestRelationDTO);
exports.TestRelationDTO = TestRelationDTO;
//# sourceMappingURL=test-relation.dto.js.map