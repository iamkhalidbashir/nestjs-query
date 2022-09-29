"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeQueryService = void 0;
const tslib_1 = require("tslib");
const lodash_pick_1 = (0, tslib_1.__importDefault)(require("lodash.pick"));
const common_1 = require("@nestjs/common");
const query_1 = require("../query");
const relation_query_service_1 = require("./relation-query.service");
/**
 * Base class for all query services that use a `sequelize` Model.
 *
 * @example
 *
 * ```ts
 * @QueryService(TodoItemEntity)
 * export class TodoItemService extends SequelizeQueryService<TodoItemEntity> {
 *   constructor(
 *      @InjectRepository(TodoItemEntity) repo: Repository<TodoItemEntity>,
 *   ) {
 *     super(repo);
 *   }
 * }
 * ```
 */
class SequelizeQueryService extends relation_query_service_1.RelationQueryService {
    constructor(model) {
        super();
        this.model = model;
        this.filterQueryBuilder = new query_1.FilterQueryBuilder(model);
    }
    /**
     * Query for multiple entities, using a Query from `@nestjs-query/core`.
     *
     * @example
     * ```ts
     * const todoItems = await this.service.query({
     *   filter: { title: { eq: 'Foo' } },
     *   paging: { limit: 10 },
     *   sorting: [{ field: "create", direction: SortDirection.DESC }],
     * });
     * ```
     * @param query - The Query used to filter, page, and sort rows.
     */
    async query(query) {
        return this.model.findAll(this.filterQueryBuilder.findOptions(query));
    }
    async aggregate(filter, aggregate) {
        const result = await this.model.findAll(this.filterQueryBuilder.aggregateOptions({ filter }, aggregate));
        if (!result) {
            return [{}];
        }
        return query_1.AggregateBuilder.convertToAggregateResponse(result);
    }
    async count(filter) {
        return this.model.count(this.filterQueryBuilder.countOptions({ filter }));
    }
    /**
     * Find an entity by it's `id`.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.findById(1);
     * ```
     * @param id - The id of the record to find.
     * @param opts - Additional options
     */
    async findById(id, opts) {
        const model = await this.model.findOne(this.filterQueryBuilder.findByIdOptions(id, opts !== null && opts !== void 0 ? opts : {}));
        if (!model) {
            return undefined;
        }
        return model;
    }
    /**
     * Gets an entity by it's `id`. If the entity is not found a rejected promise is returned.
     *
     * @example
     * ```ts
     * try {
     *   const todoItem = await this.service.getById(1);
     * } catch(e) {
     *   console.error('Unable to find entity with id = 1');
     * }
     * ```
     * @param id - The id of the record to find.
     * @param opts - Additional options
     */
    async getById(id, opts) {
        const entity = await this.findById(id, opts !== null && opts !== void 0 ? opts : {});
        if (!entity) {
            throw new common_1.NotFoundException(`Unable to find ${this.model.name} with id: ${id}`);
        }
        return entity;
    }
    /**
     * Creates a single entity.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createOne({title: 'Todo Item', completed: false });
     * ```
     * @param record - The entity to create.
     */
    async createOne(record) {
        await this.ensureEntityDoesNotExist(record);
        return this.model.create(this.getChangedValues(record));
    }
    /**
     * Create multiple entities.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createMany([
     *   {title: 'Todo Item 1', completed: false },
     *   {title: 'Todo Item 2', completed: true },
     * ]);
     * ```
     * @param records - The entities to create.
     */
    async createMany(records) {
        await Promise.all(records.map((r) => this.ensureEntityDoesNotExist(r)));
        return this.model.bulkCreate(records.map((r) => this.getChangedValues(r)));
    }
    /**
     * Update an entity.
     *
     * @example
     * ```ts
     * const updatedEntity = await this.service.updateOne(1, { completed: true });
     * ```
     * @param id - The `id` of the record.
     * @param update - A `Partial` of the entity with fields to update.
     * @param opts - Additional options.
     */
    async updateOne(id, update, opts) {
        this.ensureIdIsNotPresent(update);
        const entity = await this.getById(id, opts);
        return entity.update(this.getChangedValues(update));
    }
    /**
     * Update multiple entities with a `@nestjs-query/core` Filter.
     *
     * @example
     * ```ts
     * const { updatedCount } = await this.service.updateMany(
     *   { completed: true }, // the update to apply
     *   { title: { eq: 'Foo Title' } } // Filter to find records to update
     * );
     * ```
     * @param update - A `Partial` of entity with the fields to update
     * @param filter - A Filter used to find the records to update
     */
    async updateMany(update, filter) {
        this.ensureIdIsNotPresent(update);
        const [count] = await this.model.update(this.getChangedValues(update), this.filterQueryBuilder.updateOptions({ filter }));
        return { updatedCount: count };
    }
    /**
     * Delete an entity by `id`.
     *
     * @example
     *
     * ```ts
     * const deletedTodo = await this.service.deleteOne(1);
     * ```
     *
     * @param id - The `id` of the entity to delete.
     * @param opts - Additional options.
     */
    async deleteOne(id, opts) {
        const entity = await this.getById(id, opts);
        await entity.destroy();
        return entity;
    }
    /**
     * Delete multiple records with a `@nestjs-query/core` `Filter`.
     *
     * @example
     *
     * ```ts
     * const { deletedCount } = this.service.deleteMany({
     *   created: { lte: new Date('2020-1-1') }
     * });
     * ```
     *
     * @param filter - A `Filter` to find records to delete.
     */
    async deleteMany(filter) {
        const deletedCount = await this.model.destroy(this.filterQueryBuilder.destroyOptions({ filter }));
        return { deletedCount: deletedCount || 0 };
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getChangedValues(record) {
        if (record instanceof this.model) {
            const recordEntity = record;
            const raw = recordEntity.get({ plain: true });
            const changed = recordEntity.changed();
            if (changed === false) {
                return {};
            }
            return (0, lodash_pick_1.default)(raw, changed);
        }
        return record;
    }
    async ensureEntityDoesNotExist(e) {
        const pks = this.primaryKeyValues(e);
        if (Object.keys(pks).length) {
            const found = await this.model.findOne({ where: pks });
            if (found) {
                throw new Error('Entity already exists');
            }
        }
    }
    ensureIdIsNotPresent(e) {
        if (Object.keys(this.primaryKeyValues(e)).length) {
            throw new Error('Id cannot be specified when updating');
        }
    }
    primaryKeyValues(e) {
        const changed = this.getChangedValues(e);
        return this.model.primaryKeyAttributes.reduce((pks, pk) => {
            const key = pk;
            if (key in changed && changed[key] !== undefined) {
                return { ...pks, [pk]: changed[key] };
            }
            return pks;
        }, {});
    }
}
exports.SequelizeQueryService = SequelizeQueryService;
//# sourceMappingURL=sequelize-query.service.js.map