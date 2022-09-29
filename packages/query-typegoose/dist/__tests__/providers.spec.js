"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs-query/core");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const services_1 = require("../src/services");
const providers_1 = require("../src/providers");
describe('createTypegooseQueryServiceProviders', () => {
    it('should create a provider for the entity', () => {
        class TestEntity {
        }
        const providers = (0, providers_1.createTypegooseQueryServiceProviders)([TestEntity]);
        expect(providers).toHaveLength(1);
        expect(providers[0].provide).toBe((0, core_1.getQueryServiceToken)(TestEntity));
        expect(providers[0].inject).toEqual([(0, nestjs_typegoose_1.getModelToken)(TestEntity.name)]);
        expect(providers[0].useFactory(TestEntity)).toBeInstanceOf(services_1.TypegooseQueryService);
    });
});
//# sourceMappingURL=providers.spec.js.map