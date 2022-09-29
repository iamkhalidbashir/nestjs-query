import { Class } from '@nestjs-query/core';
export interface CreateManyInputType<C> {
    input: C[];
}
/**
 * The abstract input type for create many input types.
 * @param fieldName - the name of field to be exposed in the graphql schema
 * @param InputClass - the InputType to be used.
 */
export declare function CreateManyInputType<C>(fieldName: string, InputClass: Class<C>): Class<CreateManyInputType<C>>;
