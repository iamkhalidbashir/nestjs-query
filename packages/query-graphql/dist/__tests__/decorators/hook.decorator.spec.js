"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../src");
const decorators_1 = require("../../src/decorators");
const hooks_1 = require("../../src/hooks");
describe('hook decorators', () => {
    describe('@BeforeCreateOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateOne)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateOne)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateOne)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateOne)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_ONE, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateOne)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_ONE, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeCreateMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateMany)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateMany)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateMany)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateMany)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_MANY, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeCreateMany)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_CREATE_MANY, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeUpdateOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateOne)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateOne)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateOne)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateOne)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_ONE, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateOne)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_ONE, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeUpdateMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateMany)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateMany)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateMany)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateMany)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_MANY, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeUpdateMany)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_UPDATE_MANY, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeDeleteOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteOne)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteOne)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteOne)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteOne)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_ONE, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteOne)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_ONE, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeDeleteMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteMany)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteMany)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteMany)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteMany)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_MANY, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeDeleteMany)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_DELETE_MANY, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeQueryMany', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeQueryMany)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_QUERY_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeQueryMany)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_QUERY_MANY, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeQueryMany)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeQueryMany)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_QUERY_MANY, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeQueryMany)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_QUERY_MANY, Test)).toBe(MockHook);
        });
    });
    describe('@BeforeFindOne', () => {
        it('should store the hook', () => {
            const hookFn = jest.fn();
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeFindOne)(hookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_FIND_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the base class', () => {
            const hookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeFindOne)(hookFn)
            ], Base);
            class Test extends Base {
            }
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_FIND_ONE, Test);
            expect(new Stored[0]().run).toBe(hookFn);
        });
        it('should return a hook from the child class if there is a hook on both the base and child', () => {
            const baseHookFn = jest.fn();
            let Base = class Base {
            };
            Base = (0, tslib_1.__decorate)([
                (0, src_1.BeforeFindOne)(baseHookFn)
            ], Base);
            const childHookFn = jest.fn();
            let Test = class Test extends Base {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeFindOne)(childHookFn)
            ], Test);
            const Stored = (0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_FIND_ONE, Test);
            expect(new Stored[0]().run).toBe(childHookFn);
        });
        it('should return the hook class', () => {
            const MockHook = (0, hooks_1.createDefaultHook)(jest.fn());
            let Test = class Test {
            };
            Test = (0, tslib_1.__decorate)([
                (0, src_1.BeforeFindOne)(MockHook)
            ], Test);
            expect((0, decorators_1.getHooksForType)(hooks_1.HookTypes.BEFORE_FIND_ONE, Test)).toBe(MockHook);
        });
    });
});
//# sourceMappingURL=hook.decorator.spec.js.map