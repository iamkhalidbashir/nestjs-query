import { Provider } from '@nestjs/common';
import { CRUDAutoResolverOpts } from './resolver.provider';
import { PagingStrategies } from '../types';
export declare type HookProviderOptions<DTO, C, U> = Pick<CRUDAutoResolverOpts<DTO, C, U, unknown, PagingStrategies>, 'DTOClass' | 'CreateDTOClass' | 'UpdateDTOClass'>;
export declare const createHookProviders: (opts: HookProviderOptions<unknown, unknown, unknown>[]) => Provider[];
