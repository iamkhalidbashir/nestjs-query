"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagTodoItemEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
let TagTodoItemEntity = class TagTodoItemEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemEntity.prototype, "tagId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TagTodoItemEntity.prototype, "todoItemId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagTodoItemEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagTodoItemEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.TagEntity, (tag) => tag.tagTodoItems),
    (0, typeorm_1.JoinColumn)({ name: 'tagId' }),
    (0, tslib_1.__metadata)("design:type", tag_entity_1.TagEntity)
], TagTodoItemEntity.prototype, "tag", void 0);
TagTodoItemEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'tag_todo_item' })
], TagTodoItemEntity);
exports.TagTodoItemEntity = TagTodoItemEntity;
//# sourceMappingURL=tag-todo-item.entity.js.map