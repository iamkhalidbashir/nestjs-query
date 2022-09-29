import { Class } from '@nestjs-query/core';
import { NestInterceptor } from '@nestjs/common';
import { HookTypes, Hook } from '../hooks';
export declare type HookContext<H extends Hook<unknown>> = {
    hooks?: H[];
};
export declare function HookInterceptor(type: HookTypes, ...DTOClasses: Class<unknown>[]): Class<NestInterceptor>;
