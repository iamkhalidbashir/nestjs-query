"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryMongooseModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const providers_1 = require("./providers");
class NestjsQueryMongooseModule {
    static forFeature(models, connectionName) {
        const queryServiceProviders = (0, providers_1.createMongooseQueryServiceProviders)(models);
        const mongooseModule = mongoose_1.MongooseModule.forFeature(models, connectionName);
        return {
            imports: [mongooseModule],
            module: NestjsQueryMongooseModule,
            providers: [...queryServiceProviders],
            exports: [...queryServiceProviders, mongooseModule],
        };
    }
}
exports.NestjsQueryMongooseModule = NestjsQueryMongooseModule;
//# sourceMappingURL=module.js.map