"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.truncate = void 0;
const user_entity_1 = require("../src/user/user.entity");
const helpers_1 = require("../../../helpers");
const tables = ['user'];
const truncate = async (connection) => (0, helpers_1.executeTruncate)(connection, tables);
exports.truncate = truncate;
const refresh = async (connection) => {
    await (0, exports.truncate)(connection);
    const userRepo = connection.getRepository(user_entity_1.UserEntity);
    await userRepo.save([
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' },
    ]);
};
exports.refresh = refresh;
//# sourceMappingURL=fixtures.js.map