import { mongoose } from '@typegoose/typegoose';
export interface TypegooseClass {
    new (...args: any[]): any;
}
export interface TypegooseClassWrapper {
    typegooseClass: TypegooseClass;
}
export interface TypegooseClassWithOptions extends TypegooseClassWrapper {
    schemaOptions?: mongoose.SchemaOptions;
    discriminators?: (TypegooseClass | TypegooseDiscriminator)[];
}
export interface TypegooseDiscriminator extends TypegooseClassWrapper {
    discriminatorId?: string;
}
