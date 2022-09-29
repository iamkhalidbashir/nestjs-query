import { Connection } from 'typeorm';
export declare const truncate: (connection: Connection) => Promise<void>;
export declare const refresh: (connection: Connection) => Promise<void>;
export * from './graphql-fragments';
