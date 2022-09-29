import { Class, MetaValue } from '@nestjs-query/core';
import { FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { FilterableFieldOptions } from './filterable-field.decorator';
declare type NoFilterIDFieldOptions = {
    disableFilter: true;
} & FieldOptions;
export declare type IDFieldOptions = FilterableFieldOptions | NoFilterIDFieldOptions;
export interface IDFieldDescriptor {
    propertyName: string;
    returnTypeFunc: ReturnTypeFunc;
}
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
export declare function IDField(returnTypeFunc: ReturnTypeFunc, options?: IDFieldOptions): PropertyDecorator & MethodDecorator;
export declare function getIDField<DTO>(DTOClass: Class<DTO>): MetaValue<IDFieldDescriptor>;
export {};
