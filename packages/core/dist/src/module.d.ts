import { DynamicModule, ForwardReference } from '@nestjs/common';
import { Assembler } from './assemblers';
import { Class } from './common';
export interface NestjsQueryCoreModuleOpts {
    imports?: Array<Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    assemblers?: Class<Assembler<any, any, any, any, any, any>>[];
}
export declare class NestjsQueryCoreModule {
    static forFeature(opts: NestjsQueryCoreModuleOpts): DynamicModule;
}
