"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbConnection = exports.prepareDb = exports.dropDatabase = exports.getConnectionUri = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const seeds_1 = require("./seeds");
const { connections } = typegoose_1.mongoose;
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
function getConnectionUri() {
    return mongoServer.getUri();
}
exports.getConnectionUri = getConnectionUri;
const dropDatabase = async () => {
    await connections[connections.length - 1].dropDatabase();
};
exports.dropDatabase = dropDatabase;
const prepareDb = async () => {
    await (0, seeds_1.seed)(connections[connections.length - 1]);
};
exports.prepareDb = prepareDb;
const closeDbConnection = async () => {
    await connections[connections.length - 1].close();
    await mongoServer.stop();
};
exports.closeDbConnection = closeDbConnection;
//# sourceMappingURL=connection.fixture.js.map