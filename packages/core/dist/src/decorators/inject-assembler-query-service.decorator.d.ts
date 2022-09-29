import { Assembler } from '../assemblers';
import { Class, DeepPartial } from '../common';
export declare const InjectAssemblerQueryService: <DTO, Entity, C = DeepPartial<DTO>, CE = DeepPartial<Entity>, U = C, UE = CE>(AssemblerClass: Class<Assembler<DTO, Entity, C, CE, U, UE>>) => ParameterDecorator;
