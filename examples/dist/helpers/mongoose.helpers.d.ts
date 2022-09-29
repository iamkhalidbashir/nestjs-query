import { MongooseModuleOptions } from '@nestjs/mongoose';
export declare const mongooseConfig: (db: string, overrides?: Partial<MongooseModuleOptions> | undefined) => MongooseModuleOptions;
