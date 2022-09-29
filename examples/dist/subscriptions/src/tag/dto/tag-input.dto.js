"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagInputDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let TagInputDTO = class TagInputDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagInputDTO.prototype, "name", void 0);
TagInputDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('TagInput')
], TagInputDTO);
exports.TagInputDTO = TagInputDTO;
//# sourceMappingURL=tag-input.dto.js.map