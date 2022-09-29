import { DynamicModule } from '@nestjs/common';
import { Document } from 'mongoose';
import { NestjsQueryModelDefinition } from './providers';
export declare class NestjsQueryMongooseModule {
    static forFeature(models: NestjsQueryModelDefinition<Document>[], connectionName?: string): DynamicModule;
}
