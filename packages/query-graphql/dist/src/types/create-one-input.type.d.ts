import { Class } from '@nestjs-query/core';
export interface CreateOneInputType<C> {
    input: C;
}
/**
 * The abstract input type for create one operations.
 *
 * @param fieldName - The name of the field to be exposed in the graphql schema
 * @param InputClass - The InputType to be used.
 */
export declare function CreateOneInputType<C>(fieldName: string, InputClass: Class<C>): Class<CreateOneInputType<C>>;
