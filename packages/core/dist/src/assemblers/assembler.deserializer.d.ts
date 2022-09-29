import { Class, MetaValue } from '../common';
export declare type AssemblerDeserializer<T> = (obj: object) => T;
export declare function AssemblerDeserializer<T>(deserializer: AssemblerDeserializer<T>): <Cls extends Class<T>>(cls: Cls) => void | Cls;
export declare function getAssemblerDeserializer<DTO>(DTOClass: Class<DTO>): MetaValue<AssemblerDeserializer<DTO>>;
