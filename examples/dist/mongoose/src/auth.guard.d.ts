import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare type GqlContext = {
    request: {
        headers: Record<string, string>;
    };
};
export declare class AuthGuard implements CanActivate {
    private logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
