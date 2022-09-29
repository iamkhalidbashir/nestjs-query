import { Assembler } from '../assemblers';
import { Class } from '../common';
export declare function getQueryServiceToken(DTOClass: {
    name: string;
}): string;
export declare function getAssemblerQueryServiceToken<DTO, Entity = unknown>(AssemblerClass: Class<Assembler<DTO, Entity, unknown, unknown, unknown, unknown>>): string;
