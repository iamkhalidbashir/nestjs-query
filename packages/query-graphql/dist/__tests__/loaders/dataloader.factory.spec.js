"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dataloader_1 = (0, tslib_1.__importDefault)(require("dataloader"));
const loader_1 = require("../../src/loader");
describe('DataLoaderFactory', () => {
    describe('getOrCreateLoader', () => {
        const createContext = () => ({});
        const dataloadFn = (args) => Promise.resolve([...args]);
        it('should create a dataloader and add it to the context', () => {
            const context = createContext();
            const loader = loader_1.DataLoaderFactory.getOrCreateLoader(context, 'loader', dataloadFn);
            expect(loader).toBeInstanceOf(dataloader_1.default);
        });
        it('should return the same dataloader if called twice', () => {
            const context = createContext();
            const loader = loader_1.DataLoaderFactory.getOrCreateLoader(context, 'loader', dataloadFn);
            const loader2 = loader_1.DataLoaderFactory.getOrCreateLoader(context, 'loader', dataloadFn);
            expect(loader).toBe(loader2);
        });
    });
});
//# sourceMappingURL=dataloader.factory.spec.js.map