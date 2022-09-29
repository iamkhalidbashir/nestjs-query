"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIDField = exports.IDField = void 0;
const core_1 = require("@nestjs-query/core");
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("./constants");
const filterable_field_decorator_1 = require("./filterable-field.decorator");
const reflector = new core_1.ValueReflector(constants_1.ID_FIELD_KEY);
/**
 * Decorator for Fields that should be filterable through a [[FilterType]]
 *
 * @example
 *
 * In the following DTO `id`, `title` and `completed` are filterable.
 *
 * ```ts
 * import { IDField } from '@nestjs-query/query-graphql';
 * import { ObjectType, ID } from '@nestjs/graphql';
 *
 * @ObjectType('TodoItem')
 * export class TodoItemDTO {
 *   @IDField(() => ID)
 *   id!: string;
 * }
 * ```
 */
function IDField(returnTypeFunc, options) {
    return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target, propertyName, descriptor) => {
        reflector.set(target.constructor, {
            propertyName: propertyName.toString(),
            returnTypeFunc,
        });
        const disableFilter = options && 'disableFilter' in options;
        const FieldDecorator = disableFilter ? graphql_1.Field : filterable_field_decorator_1.FilterableField;
        if (descriptor) {
            return FieldDecorator(returnTypeFunc, options)(target, propertyName, descriptor);
        }
        return FieldDecorator(returnTypeFunc, options)(target, propertyName);
    };
}
exports.IDField = IDField;
function getIDField(DTOClass) {
    return reflector.get(DTOClass, true);
}
exports.getIDField = getIDField;
//# sourceMappingURL=id-field.decorator.js.map