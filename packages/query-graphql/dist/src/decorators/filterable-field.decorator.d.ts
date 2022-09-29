import { Class, FilterComparisonOperators } from '@nestjs-query/core';
import { FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
export declare type FilterableFieldOptions = {
    allowedComparisons?: FilterComparisonOperators<unknown>[];
    filterRequired?: boolean;
    filterOnly?: boolean;
} & FieldOptions;
export interface FilterableFieldDescriptor {
    propertyName: string;
    target: Class<unknown>;
    returnTypeFunc?: ReturnTypeFunc;
    advancedOptions?: FilterableFieldOptions;
}
/**
 * Decorator for Fields that should be filterable through a [[FilterType]]
 *
 * @example
 *
 * In the following DTO `id`, `title` and `completed` are filterable.
 *
 * ```ts
 * import { FilterableField } from '@nestjs-query/query-graphql';
 * import { ObjectType, ID, GraphQLISODateTime, Field } from '@nestjs/graphql';
 *
 * @ObjectType('TodoItem')
 * export class TodoItemDTO {
 *   @FilterableField(() => ID)
 *   id!: string;
 *
 *   @FilterableField()
 *   title!: string;
 *
 *   @FilterableField()
 *   completed!: boolean;
 *
 *   @Field(() => GraphQLISODateTime)
 *   created!: Date;
 *
 *   @Field(() => GraphQLISODateTime)
 *   updated!: Date;
 * }
 * ```
 */
export declare function FilterableField(): PropertyDecorator & MethodDecorator;
export declare function FilterableField(options: FilterableFieldOptions): PropertyDecorator & MethodDecorator;
export declare function FilterableField(returnTypeFunction?: ReturnTypeFunc, options?: FilterableFieldOptions): PropertyDecorator & MethodDecorator;
export declare function getFilterableFields<DTO>(DTOClass: Class<DTO>): FilterableFieldDescriptor[];
