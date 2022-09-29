"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const providers_1 = require("../src/providers");
const services_1 = require("../src/services");
describe('createSequelizeQueryServiceProviders', () => {
    it('should create a provider for the entity', () => {
        let TestEntity = class TestEntity extends sequelize_typescript_1.Model {
        };
        (0, tslib_1.__decorate)([
            sequelize_typescript_1.Column,
            (0, tslib_1.__metadata)("design:type", String)
        ], TestEntity.prototype, "foo", void 0);
        TestEntity = (0, tslib_1.__decorate)([
            sequelize_typescript_1.Table
        ], TestEntity);
        // eslint-disable-next-line no-new
        new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            database: ':memory:',
            models: [TestEntity],
        });
        const providers = (0, providers_1.createSequelizeQueryServiceProviders)([TestEntity]);
        expect(providers).toHaveLength(1);
        expect(providers[0].provide).toBe((0, core_1.getQueryServiceToken)(TestEntity));
        expect(providers[0].inject).toEqual([(0, sequelize_1.getModelToken)(TestEntity)]);
        expect(providers[0].useFactory(TestEntity)).toBeInstanceOf(services_1.SequelizeQueryService);
    });
});
//# sourceMappingURL=providers.spec.js.map