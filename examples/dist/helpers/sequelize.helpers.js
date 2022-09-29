"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeOrmConfig = exports.sequelizePostgresOptions = exports.sequelizeMysqlOptions = void 0;
const db_test_helpers_1 = require("./db-test.helpers");
const sequelizeMysqlOptions = (username, database, overrides) => ({
    dialect: 'mysql',
    port: 3306,
    host: 'localhost',
    username,
    database,
    autoLoadModels: true,
    synchronize: true,
    logging: false,
    ...overrides,
});
exports.sequelizeMysqlOptions = sequelizeMysqlOptions;
const sequelizePostgresOptions = (username, database, overrides) => ({
    dialect: 'postgres',
    port: 5436,
    host: 'localhost',
    username,
    database,
    autoLoadModels: true,
    synchronize: true,
    logging: false,
    ...overrides,
});
exports.sequelizePostgresOptions = sequelizePostgresOptions;
const sequelizeOrmConfig = (username, database = username, overrides) => {
    if (db_test_helpers_1.dbType === 'postgres') {
        return (0, exports.sequelizePostgresOptions)(username, database, overrides);
    }
    return (0, exports.sequelizeMysqlOptions)(username, database, overrides);
};
exports.sequelizeOrmConfig = sequelizeOrmConfig;
//# sourceMappingURL=sequelize.helpers.js.map