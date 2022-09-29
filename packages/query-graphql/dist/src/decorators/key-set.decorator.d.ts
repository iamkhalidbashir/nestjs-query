import { Class, MetaValue } from '@nestjs-query/core';
export declare function KeySet<DTO>(keys: (keyof DTO)[]): (DTOClass: Class<DTO>) => void;
export declare const getKeySet: <DTO>(DTOClass: Class<DTO>) => MetaValue<(keyof DTO)[]>;
