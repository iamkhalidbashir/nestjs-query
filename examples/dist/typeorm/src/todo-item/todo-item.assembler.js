"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItemAssembler = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const todo_item_dto_1 = require("./dto/todo-item.dto");
const todo_item_entity_1 = require("./todo-item.entity");
let TodoItemAssembler = class TodoItemAssembler extends core_1.ClassTransformerAssembler {
    convertToDTO(entity) {
        const dto = super.convertToDTO(entity);
        dto.age = Date.now() - entity.created.getMilliseconds();
        return dto;
    }
};
TodoItemAssembler = (0, tslib_1.__decorate)([
    (0, core_1.Assembler)(todo_item_dto_1.TodoItemDTO, todo_item_entity_1.TodoItemEntity)
], TodoItemAssembler);
exports.TodoItemAssembler = TodoItemAssembler;
//# sourceMappingURL=todo-item.assembler.js.map