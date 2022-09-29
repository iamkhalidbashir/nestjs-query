"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubTaskDTO = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const helpers_1 = require("../../helpers");
let CreateSubTaskDTO = class CreateSubTaskDTO {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateSubTaskDTO.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateSubTaskDTO.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateSubTaskDTO.prototype, "completed", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateSubTaskDTO.prototype, "todoItemId", void 0);
CreateSubTaskDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)('SubTaskInput'),
    (0, query_graphql_1.BeforeCreateOne)((input, context) => {
        // eslint-disable-next-line no-param-reassign
        input.input.createdBy = (0, helpers_1.getUserName)(context);
        return input;
    }),
    (0, query_graphql_1.BeforeCreateMany)((input, context) => {
        const createdBy = (0, helpers_1.getUserName)(context);
        // eslint-disable-next-line no-param-reassign
        input.input = input.input.map((c) => ({ ...c, createdBy }));
        return input;
    })
], CreateSubTaskDTO);
exports.CreateSubTaskDTO = CreateSubTaskDTO;
//# sourceMappingURL=subtask-input.dto.js.map