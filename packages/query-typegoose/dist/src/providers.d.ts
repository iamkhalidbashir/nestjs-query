import { FactoryProvider } from '@nestjs/common';
import { TypegooseClass, TypegooseClassWithOptions } from './typegoose-interface.helpers';
export declare const createTypegooseQueryServiceProviders: (models: (TypegooseClass | TypegooseClassWithOptions)[]) => FactoryProvider[];
