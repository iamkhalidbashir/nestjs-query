import { Class } from '@nestjs-query/core';
/** @internal */
export declare class UnregisteredObjectType<T> extends Error {
    constructor(Cls: Class<T>, description: string);
}
