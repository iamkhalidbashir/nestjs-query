"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const tag_todo_item_entity_1 = require("./tag-todo-item.entity");
let TagEntity = class TagEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], TagEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], TagEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "created", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, tslib_1.__metadata)("design:type", Date)
], TagEntity.prototype, "updated", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => tag_todo_item_entity_1.TagTodoItemEntity, (tagTodoItem) => tagTodoItem.tag),
    (0, tslib_1.__metadata)("design:type", Array)
], TagEntity.prototype, "tagTodoItems", void 0);
TagEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: 'tag' })
], TagEntity);
exports.TagEntity = TagEntity;
//# sourceMappingURL=tag.entity.js.map