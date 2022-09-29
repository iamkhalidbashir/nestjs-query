import { DynamicModule } from '@nestjs/common';
import { ModelCtor, SequelizeOptions } from 'sequelize-typescript';
export declare class NestjsQuerySequelizeModule {
    static forFeature(entities: ModelCtor[], connection?: SequelizeOptions | string): DynamicModule;
}
