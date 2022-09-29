import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
export declare const CONNECTION_OPTIONS: SequelizeOptions;
export declare const truncate: (sequelize: Sequelize) => Promise<void>;
export declare const refresh: (sequelize: Sequelize) => Promise<void>;
