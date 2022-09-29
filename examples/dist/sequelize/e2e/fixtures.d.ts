import { Sequelize } from 'sequelize';
export declare const truncate: (sequelize: Sequelize) => Promise<void>;
export declare const refresh: (connection: Sequelize) => Promise<void>;
