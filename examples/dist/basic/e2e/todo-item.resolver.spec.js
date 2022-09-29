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
describe('TodoItemResolver (basic - e2e)', () => {
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
    describe('find one', () => {
        it(`should find a todo item by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            ${graphql_fragments_1.todoItemFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    todoItem: { id: '1', title: 'Create Nest App', completed: true, description: null },
                },
            });
        }));
        it(`should return null if the todo item is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 100) {
            ${graphql_fragments_1.todoItemFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                todoItem: null,
            },
        }));
        it(`should not include filter-only fields`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
            todoItem(id: 1) {
              ${graphql_fragments_1.todoItemFields}
              created
            }
          }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Cannot query field "created" on type "TodoItem".');
        }));
        it(`should return subTasks as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            subTasks(sorting: { field: id, direction: ASC }) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItem.subTasks;
            expect(edges).toHaveLength(3);
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            edges.forEach((e) => expect(e.node.todoItemId).toBe('1'));
        }));
        it(`should return tags as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItem(id: 1) {
            tags(sorting: [{ field: id, direction: ASC }]) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItem.tags;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home']);
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null },
                { id: '2', title: 'Create Entity', completed: false, description: null },
                { id: '3', title: 'Create Entity Service', completed: false, description: null },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null },
                { id: '5', title: 'How to create item With Sub Tasks', completed: false, description: null },
            ]);
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(filter: { id: { in: [1, 2, 3] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null },
                { id: '2', title: 'Create Entity', completed: false, description: null },
                { id: '3', title: 'Create Entity Service', completed: false, description: null },
            ]);
        }));
        it(`should allow querying by filter-only fields`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {
                now: new Date().toISOString(),
            },
            query: `query ($now: DateTime!) {
            todoItems(filter: { created: { lt: $now } }) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
            }
          }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '1', title: 'Create Nest App', completed: true, description: null },
                { id: '2', title: 'Create Entity', completed: false, description: null },
                { id: '3', title: 'Create Entity Service', completed: false, description: null },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null },
                { id: '5', title: 'How to create item With Sub Tasks', completed: false, description: null },
            ]);
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          todoItems(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual([
                { id: '5', title: 'How to create item With Sub Tasks', completed: false, description: null },
                { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null },
                { id: '3', title: 'Create Entity Service', completed: false, description: null },
                { id: '2', title: 'Create Entity', completed: false, description: null },
                { id: '1', title: 'Create Nest App', completed: true, description: null },
            ]);
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          todoItems(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.todoItems;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '1', title: 'Create Nest App', completed: true, description: null },
                    { id: '2', title: 'Create Entity', completed: false, description: null },
                ]);
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          todoItems(paging: {first: 2, after: "YXJyYXljb25uZWN0aW9uOjE="}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.todoItemFields)}
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.todoItems;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjM=',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual([
                    { id: '3', title: 'Create Entity Service', completed: false, description: null },
                    { id: '4', title: 'Add Todo Item Resolver', completed: false, description: null },
                ]);
            }));
        });
    });
    describe('create one', () => {
        it('should allow creating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTodoItem(
              input: {
                todoItem: { title: "Test Todo", completed: false }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneTodoItem: {
                    id: '6',
                    title: 'Test Todo',
                    completed: false,
                },
            },
        }));
        it('should validate a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTodoItem(
              input: {
                todoItem: { title: "Test Todo with a too long title!", completed: false }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('create many', () => {
        it('should allow creating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTodoItems(
              input: {
                todoItems: [
                  { title: "Many Test Todo 1", completed: false },
                  { title: "Many Test Todo 2", completed: true }
                ]
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                createManyTodoItems: [
                    { id: '7', title: 'Many Test Todo 1', completed: false },
                    { id: '8', title: 'Many Test Todo 2', completed: true },
                ],
            },
        }));
        it('should validate a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTodoItems(
              input: {
                todoItems: [{ title: "Test Todo With A Really Long Title", completed: false }]
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('update one', () => {
        it('should allow updating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                id: "6",
                update: { title: "Update Test Todo", completed: true }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTodoItem: {
                    id: '6',
                    title: 'Update Test Todo',
                    completed: true,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                update: { title: "Update Test Todo With A Really Long Title" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneTodoItemInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTodoItem(
              input: {
                id: "6",
                update: { title: "Update Test Todo With A Really Long Title" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title must be shorter than or equal to 20 characters');
        }));
    });
    describe('update many', () => {
        it('should allow updating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                filter: {id: { in: ["7", "8"]} },
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTodoItems: {
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
            updateManyTodoItems(
              input: {
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyTodoItemsInput.filter" of required type "TodoItemUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTodoItems(
              input: {
                filter: { },
                update: { title: "Update Many Test", completed: true }
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
        it('should allow deleting a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTodoItem(
              input: { id: "6" }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneTodoItem: {
                    id: null,
                    title: 'Update Test Todo',
                    completed: true,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTodoItem(
              input: { }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneTodoItemInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should allow updating a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
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
                deleteManyTodoItems: {
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
            deleteManyTodoItems(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyTodoItemsInput.filter" of required type "TodoItemDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTodoItems(
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
    describe('addSubTasksToTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addSubTasksToTodoItem(
              input: {
                id: 1,
                relationIds: ["4", "5", "6"]
              }
            ) {
              id
              title
              subTasks {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.addSubTasksToTodoItem.subTasks;
            expect(body.data.addSubTasksToTodoItem.id).toBe('1');
            expect(edges).toHaveLength(6);
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjU=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            edges.forEach((e) => expect(e.node.todoItemId).toBe('1'));
        }));
    });
    describe('addTagsToTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            addTagsToTodoItem(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.addTagsToTodoItem.tags;
            expect(body.data.addTagsToTodoItem.id).toBe('1');
            expect(edges).toHaveLength(5);
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home', 'Work', 'Question', 'Blocked']);
        }));
    });
    describe('removeTagsFromTodoItem', () => {
        it('allow adding subTasks to a todoItem', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            removeTagsFromTodoItem(
              input: {
                id: 1,
                relationIds: ["3", "4", "5"]
              }
            ) {
              id
              title
              tags(sorting: [{ field: id, direction: ASC }]) {
                ${graphql_fragments_1.pageInfoField}
                ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
              }
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.removeTagsFromTodoItem.tags;
            expect(body.data.removeTagsFromTodoItem.id).toBe('1');
            expect(edges).toHaveLength(2);
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges.map((e) => e.node.name)).toEqual(['Urgent', 'Home']);
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=todo-item.resolver.spec.js.map