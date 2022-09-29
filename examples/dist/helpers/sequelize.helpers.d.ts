import { SequelizeModuleOptions } from '@nestjs/sequelize';
export declare const sequelizeMysqlOptions: (username: string, database: string, overrides?: Partial<SequelizeModuleOptions> | undefined) => SequelizeModuleOptions;
export declare const sequelizePostgresOptions: (username: string, database: string, overrides?: Partial<SequelizeModuleOptions> | undefined) => SequelizeModuleOptions;
export declare const sequelizeOrmConfig: (username: string, database?: string, overrides?: Partial<SequelizeModuleOptions> | undefined) => SequelizeModuleOptions;
