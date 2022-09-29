"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormOrmConfig = exports.typeormPostgresOptions = exports.typeormMysqlOptions = void 0;
const db_test_helpers_1 = require("./db-test.helpers");
const typeormMysqlOptions = (username, database, overrides) => ({
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username,
    database,
    autoLoadEntities: true,
    synchronize: true,
    ...overrides,
});
exports.typeormMysqlOptions = typeormMysqlOptions;
const typeormPostgresOptions = (username, database, overrides) => ({
    type: 'postgres',
    port: 5436,
    host: 'localhost',
    username,
    database,
    autoLoadEntities: true,
    synchronize: true,
    ...overrides,
});
exports.typeormPostgresOptions = typeormPostgresOptions;
const typeormOrmConfig = (username, database = username, overrides) => {
    if (db_test_helpers_1.dbType === 'postgres') {
        return (0, exports.typeormPostgresOptions)(username, database, overrides);
    }
    return (0, exports.typeormMysqlOptions)(username, database, overrides);
};
exports.typeormOrmConfig = typeormOrmConfig;
//# sourceMappingURL=typeorm.helpers.js.map