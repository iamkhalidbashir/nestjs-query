"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_item_entity_1 = require("./todo-item.entity");
let TodoItemService = class TodoItemService extends query_typeorm_1.TypeOrmQueryService {
    constructor(repo) {
        super(repo, { useSoftDelete: true });
    }
};
TodoItemService = (0, tslib_1.__decorate)([
    (0, core_1.QueryService)(todo_item_entity_1.TodoItemEntity),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(todo_item_entity_1.TodoItemEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeorm_2.Repository])
], TodoItemService);
exports.TodoItemService = TodoItemService;
//# sourceMappingURL=todo-item.service.js.map