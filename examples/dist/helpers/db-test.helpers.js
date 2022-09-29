"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeTruncate = exports.asyncLoop = exports.truncateSql = exports.dbType = void 0;
exports.dbType = (_a = process.env.NESTJS_QUERY_DB_TYPE) !== null && _a !== void 0 ? _a : 'postgres';
const truncateSql = (table) => {
    if (exports.dbType === 'mysql') {
        return [`DELETE FROM \`${table}\``, `ALTER TABLE \`${table}\` AUTO_INCREMENT = 1`];
    }
    return [`TRUNCATE "${table}" RESTART IDENTITY CASCADE`];
};
exports.truncateSql = truncateSql;
const asyncLoop = async (items, fn) => items.reduce(async (prev, item) => {
    await prev;
    await fn(item);
}, Promise.resolve());
exports.asyncLoop = asyncLoop;
const executeTruncate = (exec, table) => {
    if (Array.isArray(table)) {
        return (0, exports.asyncLoop)(table, (t) => (0, exports.executeTruncate)(exec, t));
    }
    const sqls = (0, exports.truncateSql)(table);
    return (0, exports.asyncLoop)(sqls, (sql) => exec.query(sql));
};
exports.executeTruncate = executeTruncate;
//# sourceMappingURL=db-test.helpers.js.map