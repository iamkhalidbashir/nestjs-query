"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQuerySequelizeModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const providers_1 = require("./providers");
class NestjsQuerySequelizeModule {
    static forFeature(entities, connection) {
        const queryServiceProviders = (0, providers_1.createSequelizeQueryServiceProviders)(entities, connection);
        const nestjsSequelize = sequelize_1.SequelizeModule.forFeature(entities);
        return {
            module: NestjsQuerySequelizeModule,
            imports: [nestjsSequelize],
            providers: [...queryServiceProviders],
            exports: [...queryServiceProviders, nestjsSequelize],
        };
    }
}
exports.NestjsQuerySequelizeModule = NestjsQuerySequelizeModule;
//# sourceMappingURL=module.js.map