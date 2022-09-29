import { Class } from '@nestjs-query/core';
import { FactoryProvider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export declare type NestjsQueryModelDefinition<Entity extends Document> = {
    document: Class<Entity>;
} & ModelDefinition;
export declare const createMongooseQueryServiceProviders: (models: NestjsQueryModelDefinition<Document>[]) => FactoryProvider[];
