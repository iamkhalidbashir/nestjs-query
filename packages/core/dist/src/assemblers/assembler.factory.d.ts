import { Class, DeepPartial } from '../common';
import { Assembler } from './assembler';
/**
 * Assembler Service used by query services to look up Assemblers.
 */
export declare class AssemblerFactory {
    static getAssembler<DTO, Entity, C = DeepPartial<DTO>, CE = DeepPartial<Entity>, U = C, UE = CE>(DTOClass: Class<DTO>, EntityClass: Class<Entity>): Assembler<DTO, Entity, C, CE, U, UE>;
}
