import { Class, DeepPartial } from '../common';
import { AggregateQuery, Query, AggregateResponse } from '../interfaces';
import { Assembler } from './assembler';
/**
 * Base implementation for Assemblers that requires the implementation of.
 * * convertToDTO
 * * convertToEntity
 * * convertQuery
 *
 */
export declare abstract class AbstractAssembler<DTO, Entity, C = DeepPartial<DTO>, CE = DeepPartial<Entity>, U = C, UE = CE> implements Assembler<DTO, Entity, C, CE, U, UE> {
    readonly DTOClass: Class<DTO>;
    readonly EntityClass: Class<Entity>;
    /**
     * @param DTOClass - Optional class definition for the DTO. If not provided it will be looked up from the \@Assembler annotation.
     * @param EntityClass - Optional class definition for the entity. If not provided it will be looked up from the \@Assembler annotation.
     */
    constructor(DTOClass?: Class<DTO>, EntityClass?: Class<Entity>);
    abstract convertToDTO(entity: Entity): DTO;
    abstract convertToEntity(dto: DTO): Entity;
    abstract convertQuery(query: Query<DTO>): Query<Entity>;
    abstract convertAggregateQuery(aggregate: AggregateQuery<DTO>): AggregateQuery<Entity>;
    abstract convertAggregateResponse(aggregate: AggregateResponse<Entity>): AggregateResponse<DTO>;
    abstract convertToCreateEntity(create: C): CE;
    abstract convertToUpdateEntity(update: U): UE;
    convertToDTOs(entities: Entity[]): DTO[];
    convertToEntities(dtos: DTO[]): Entity[];
    convertToCreateEntities(createDtos: C[]): CE[];
    convertAsyncToDTO(entity: Promise<Entity>): Promise<DTO>;
    convertAsyncToDTOs(entities: Promise<Entity[]>): Promise<DTO[]>;
    convertAsyncToEntity(dto: Promise<DTO>): Promise<Entity>;
    convertAsyncToEntities(dtos: Promise<DTO[]>): Promise<Entity[]>;
}
