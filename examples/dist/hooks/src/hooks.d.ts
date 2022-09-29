import { BeforeCreateManyHook, BeforeCreateOneHook, BeforeUpdateManyHook, BeforeUpdateOneHook, CreateManyInputType, CreateOneInputType, UpdateManyInputType, UpdateOneInputType } from '@nestjs-query/query-graphql';
import { GqlContext } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
interface CreatedBy {
    createdBy: string;
}
interface UpdatedBy {
    updatedBy: string;
}
export declare class CreatedByHook<T extends CreatedBy> implements BeforeCreateOneHook<T, GqlContext>, BeforeCreateManyHook<T, GqlContext> {
    readonly authService: AuthService;
    constructor(authService: AuthService);
    run(instance: CreateManyInputType<T>, context: GqlContext): Promise<CreateManyInputType<T>>;
    run(instance: CreateOneInputType<T>, context: GqlContext): Promise<CreateOneInputType<T>>;
}
export declare class UpdatedByHook<T extends UpdatedBy> implements BeforeUpdateOneHook<T, GqlContext>, BeforeUpdateManyHook<T, T, GqlContext> {
    readonly authService: AuthService;
    constructor(authService: AuthService);
    run(instance: UpdateOneInputType<T>, context: GqlContext): Promise<UpdateOneInputType<T>>;
    run(instance: UpdateManyInputType<T, T>, context: GqlContext): Promise<UpdateManyInputType<T, T>>;
}
export {};
