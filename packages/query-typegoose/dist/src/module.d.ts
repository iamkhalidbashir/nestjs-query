import { DynamicModule } from '@nestjs/common';
import { TypegooseClassWithOptions, TypegooseClass } from './typegoose-interface.helpers';
export declare class NestjsQueryTypegooseModule {
    static forFeature(models: (TypegooseClass | TypegooseClassWithOptions)[], connectionName?: string): DynamicModule;
}
