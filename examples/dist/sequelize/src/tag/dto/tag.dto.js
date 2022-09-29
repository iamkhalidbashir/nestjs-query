"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDTO = void 0;
const tslib_1 = require("tslib");
const query_graphql_1 = require("@nestjs-query/query-graphql");
const graphql_1 = require("@nestjs/graphql");
const todo_item_dto_1 = require("../../todo-item/dto/todo-item.dto");
let TagDTO = class TagDTO {
};
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", Number)
], TagDTO.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagDTO.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TagDTO.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, query_graphql_1.FilterableField)(() => graphql_1.GraphQLISODateTime),
    (0, tslib_1.__metadata)("design:type", Date)
], TagDTO.prototype, "updated", void 0);
TagDTO = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)('Tag'),
    (0, query_graphql_1.KeySet)(['id']),
    (0, query_graphql_1.QueryOptions)({ enableTotalCount: true }),
    (0, query_graphql_1.FilterableCursorConnection)('todoItems', () => todo_item_dto_1.TodoItemDTO)
], TagDTO);
exports.TagDTO = TagDTO;
//# sourceMappingURL=tag.dto.js.map