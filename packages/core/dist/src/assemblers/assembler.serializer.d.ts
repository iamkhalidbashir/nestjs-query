import { Class, MetaValue } from '../common';
export declare type AssemblerSerializer<T> = (instance: T) => object;
export declare function AssemblerSerializer<T>(serializer: AssemblerSerializer<T>): <Cls extends Class<T>>(cls: Cls) => void | Cls;
export declare function getAssemblerSerializer<DTO>(DTOClass: Class<DTO>): MetaValue<AssemblerSerializer<DTO>>;
