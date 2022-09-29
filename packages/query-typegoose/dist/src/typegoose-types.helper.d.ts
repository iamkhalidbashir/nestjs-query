import { mongoose } from '@typegoose/typegoose';
export declare type ReferenceOptions = {
    type: mongoose.SchemaType;
    ref: string;
};
export declare type UpdateArrayQuery<T> = {
    $addToSet: {
        [key: string]: {
            $each: T[];
        };
    };
    $pull: {
        [key: string]: {
            [key: string]: {
                $in: T[keyof T][];
            };
        };
    };
};
export declare function isReferenceOptions(options: unknown): options is ReferenceOptions;
export declare type SchemaTypeWithReferenceOptions = {
    options: ReferenceOptions;
};
export declare function isSchemaTypeWithReferenceOptions(type: unknown): type is SchemaTypeWithReferenceOptions;
export declare type EmbeddedSchemaTypeOptions = {
    $embeddedSchemaType: {
        options: ReferenceOptions;
    };
};
export declare function isEmbeddedSchemaTypeOptions(options: unknown): options is EmbeddedSchemaTypeOptions;
export declare type VirtualReferenceOptions = {
    ref: string;
    localField: string;
    foreignField: string;
};
export declare function isVirtualReferenceOptions(options: unknown): options is VirtualReferenceOptions;
export declare type VirtualTypeWithOptions = {
    options: VirtualReferenceOptions;
};
export declare function isVirtualTypeWithReferenceOptions(virtualType: unknown): virtualType is VirtualTypeWithOptions;
