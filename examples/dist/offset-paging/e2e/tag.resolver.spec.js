"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
describe('TagResolver (limitOffset - e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        }));
        await app.init();
        await (0, fixtures_1.refresh)(app.get(typeorm_1.Connection));
    });
    afterAll(() => (0, fixtures_1.refresh)(app.get(typeorm_1.Connection)));
    const tags = [
        { id: '1', name: 'Urgent' },
        { id: '2', name: 'Home' },
        { id: '3', name: 'Work' },
        { id: '4', name: 'Question' },
        { id: '5', name: 'Blocked' },
    ];
    describe('find one', () => {
        it(`should find a tag by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, { data: { tag: tags[0] } }));
        it(`should return null if the tag is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 100) {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                tag: null,
            },
        }));
        it(`should return todoItems as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: 1) {
            todoItems(sorting: [{ field: id, direction: ASC }]) {
              ${(0, graphql_fragments_1.offsetConnection)('id')}
            }
          }
        }`,
        })
            .expect(200, {
            data: {
                tag: {
                    todoItems: {
                        nodes: [{ id: '1' }, { id: '2' }],
                        pageInfo: { hasNextPage: false, hasPreviousPage: false },
                    },
                },
            },
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags {
            ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.tagFields)}
          }
        }`,
        })
            .expect(200, { data: { tags: { nodes: tags, pageInfo: { hasNextPage: false, hasPreviousPage: false } } } }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(filter: { id: { in: [1, 2, 3] } }) {
            ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.tagFields)}
          }
        }`,
        })
            .expect(200, {
            data: { tags: { nodes: tags.slice(0, 3), pageInfo: { hasNextPage: false, hasPreviousPage: false } } },
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(sorting: [{field: id, direction: DESC}]) {
            ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.tagFields)}
          }
        }`,
        })
            .expect(200, {
            data: { tags: { nodes: tags.slice().reverse(), pageInfo: { hasNextPage: false, hasPreviousPage: false } } },
        }));
        describe('paging', () => {
            it(`should allow paging with the 'limit' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {limit: 2}) {
            ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.tagFields)}
          }
        }`,
            })
                .expect(200, {
                data: { tags: { nodes: tags.slice(0, 2), pageInfo: { hasNextPage: true, hasPreviousPage: false } } },
            }));
            it(`should allow paging with the 'limit' field and 'offset'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {limit: 2, offset: 2}) {
            ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.tagFields)}
          }
        }`,
            })
                .expect(200)
                .expect(200, {
                data: { tags: { nodes: tags.slice(2, 4), pageInfo: { hasNextPage: true, hasPreviousPage: true } } },
            }));
        });
    });
    describe('create one', () => {
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneTag: {
                    id: '6',
                    name: 'Test Tag',
                },
            },
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('create many', () => {
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Create Many Tag - 1" },
                  { name: "Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyTags: [
                    { id: '7', name: 'Create Many Tag - 1' },
                    { id: '8', name: 'Create Many Tag - 2' },
                ],
            },
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [{ name: "" }]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update one', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "6",
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTag: {
                    id: '6',
                    name: 'Update Test Tag',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneTagInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "6",
                update: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update many', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: {id: { in: ["7", "8"]} },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTags: {
                    updatedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyTagsInput.filter" of required type "TagUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: { },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    describe('delete one', () => {
        it('should allow deleting a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { id: "6" }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneTag: {
                    id: null,
                    name: 'Update Test Tag',
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneTagInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: {id: { in: ["7", "8"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteManyTags: {
                    deletedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyTagsInput.filter" of required type "TagDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: { },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    describe('addTodoItemsToTag', () => {
        it('allow adding subTasks to a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addTodoItemsToTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.todoItemFields)}
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { id, todoItems } = body.data.addTodoItemsToTag;
            expect(id).toBe('1');
            expect(todoItems.nodes).toHaveLength(5);
            expect(todoItems.nodes.map((e) => e.title).sort()).toEqual([
                'Add Todo Item Resolver',
                'Create Entity',
                'Create Entity Service',
                'Create Nest App',
                'How to create item With Sub Tasks',
            ]);
        }));
    });
    describe('removeTodoItemsFromTag', () => {
        it('allow removing todoItems from a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            removeTodoItemsFromTag(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              todoItems {
                ${(0, graphql_fragments_1.offsetConnection)(graphql_fragments_1.todoItemFields)}
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { id, todoItems } = body.data.removeTodoItemsFromTag;
            expect(id).toBe('1');
            expect(todoItems.nodes).toHaveLength(2);
            expect(todoItems.nodes.map((e) => e.title).sort()).toEqual(['Create Entity', 'Create Nest App']);
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=tag.resolver.spec.js.map