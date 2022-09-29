"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConfig = void 0;
const mongooseConfig = (db, overrides) => ({
    uri: `mongodb://localhost/${db}`,
    useNewUrlParser: true,
    ...overrides,
});
exports.mongooseConfig = mongooseConfig;
//# sourceMappingURL=mongoose.helpers.js.map