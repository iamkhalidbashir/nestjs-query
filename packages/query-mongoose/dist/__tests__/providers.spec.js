"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs-query/core");
const ts_mockito_1 = require("ts-mockito");
const mongoose_1 = require("mongoose");
const providers_1 = require("../src/providers");
const services_1 = require("../src/services");
describe('createTypegooseQueryServiceProviders', () => {
    it('should create a provider for the entity', () => {
        class TestEntity extends mongoose_1.Document {
        }
        const providers = (0, providers_1.createMongooseQueryServiceProviders)([
            { document: TestEntity, name: TestEntity.name, schema: null },
        ]);
        expect(providers).toHaveLength(1);
        expect(providers[0].provide).toBe((0, core_1.getQueryServiceToken)(TestEntity));
        expect(providers[0].inject).toEqual([`${TestEntity.name}Model`]);
        expect(providers[0].useFactory((0, ts_mockito_1.instance)(() => { }))).toBeInstanceOf(services_1.MongooseQueryService);
    });
});
//# sourceMappingURL=providers.spec.js.map