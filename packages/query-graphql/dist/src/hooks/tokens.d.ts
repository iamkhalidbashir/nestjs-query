import { Class } from '@nestjs-query/core';
import { HookTypes } from './types';
export declare const getHookToken: <DTO>(hookType: HookTypes, DTOClass: Class<DTO>) => string;
