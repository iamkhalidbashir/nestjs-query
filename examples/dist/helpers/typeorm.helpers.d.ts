import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare const typeormMysqlOptions: (username: string, database: string, overrides?: Partial<TypeOrmModuleOptions> | undefined) => TypeOrmModuleOptions;
export declare const typeormPostgresOptions: (username: string, database: string, overrides?: Partial<TypeOrmModuleOptions> | undefined) => TypeOrmModuleOptions;
export declare const typeormOrmConfig: (username: string, database?: string, overrides?: Partial<TypeOrmModuleOptions> | undefined) => TypeOrmModuleOptions;
