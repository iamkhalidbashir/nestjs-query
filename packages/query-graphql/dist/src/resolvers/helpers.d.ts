import { Class, Filter } from '@nestjs-query/core';
import { SubscriptionArgsType, SubscriptionFilterInputType } from '../types';
/** @internal */
export declare const transformAndValidate: <T>(TClass: Class<T>, partial: T) => Promise<T>;
export declare const createSubscriptionFilter: <DTO, Input extends SubscriptionFilterInputType<DTO>>(InputClass: Class<Input>, payloadKey: string) => (payload: any, variables: SubscriptionArgsType<Input>, context: any) => boolean | Promise<boolean>;
export declare function getSubscriptionEventName<T>(eventName: string, authorizeFilter?: Filter<T>): string;
