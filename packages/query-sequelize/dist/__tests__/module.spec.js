"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const src_1 = require("../src");
describe('NestjsQueryTypeOrmModule', () => {
    it('should create a module', () => {
        class TestEntity extends sequelize_typescript_1.Model {
        }
        const module = src_1.NestjsQuerySequelizeModule.forFeature([TestEntity]);
        expect(module.imports).toHaveLength(1);
        expect(module.module).toBe(src_1.NestjsQuerySequelizeModule);
        expect(module.providers).toHaveLength(1);
        expect(module.exports).toHaveLength(2);
    });
});
//# sourceMappingURL=module.spec.js.map