"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLoaderFactory = void 0;
const tslib_1 = require("tslib");
const dataloader_1 = (0, tslib_1.__importDefault)(require("dataloader"));
const cacheKeyFn = (key) => 
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
JSON.stringify(key, (_, v) => (typeof v === 'bigint' ? v.toString() : v));
class DataLoaderFactory {
    static initializeContext(context) {
        if (!context.nestjsQueryLoaders) {
            // eslint-disable-next-line no-param-reassign
            context.nestjsQueryLoaders = {};
        }
        return context.nestjsQueryLoaders;
    }
    static getOrCreateLoader(context, name, handler) {
        const nestjsQueryLoaders = this.initializeContext(context);
        if (!nestjsQueryLoaders[name]) {
            // eslint-disable-next-line no-param-reassign
            nestjsQueryLoaders[name] = new dataloader_1.default(handler, { cacheKeyFn });
        }
        return nestjsQueryLoaders[name];
    }
}
exports.DataLoaderFactory = DataLoaderFactory;
//# sourceMappingURL=dataloader.factory.js.map