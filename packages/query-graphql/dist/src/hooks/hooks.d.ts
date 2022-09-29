import { Class, Query } from '@nestjs-query/core';
import { CreateManyInputType, CreateOneInputType, DeleteManyInputType, DeleteOneInputType, FindOneArgsType, UpdateManyInputType, UpdateOneInputType } from '../types';
export interface Hook<T, Context = any> {
    run(instance: T, context: Context): T | Promise<T>;
}
export declare function isHookClass<T, Context>(hook: unknown): hook is Class<Hook<T, Context>>;
export declare type BeforeCreateOneHook<DTO, Context = any> = Hook<CreateOneInputType<DTO>, Context>;
export declare type BeforeCreateManyHook<DTO, Context = any> = Hook<CreateManyInputType<DTO>, Context>;
export declare type BeforeUpdateOneHook<DTO, Context = any> = Hook<UpdateOneInputType<DTO>, Context>;
export declare type BeforeUpdateManyHook<DTO, U, Context = any> = Hook<UpdateManyInputType<DTO, U>, Context>;
export declare type BeforeDeleteOneHook<Context = any> = Hook<DeleteOneInputType, Context>;
export declare type BeforeDeleteManyHook<DTO, Context = any> = Hook<DeleteManyInputType<DTO>, Context>;
export declare type BeforeQueryManyHook<DTO, Context = any> = Hook<Query<DTO>, Context>;
export declare type BeforeFindOneHook<Context = any> = Hook<FindOneArgsType, Context>;
