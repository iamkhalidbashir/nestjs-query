import { UserEntity } from '../user/user.entity';
export declare type AuthenticatedUser = Pick<UserEntity, 'id' | 'username'>;
export declare type JwtPayload = {
    sub: number;
    username: string;
};
export declare type UserContext = {
    req: {
        user: AuthenticatedUser;
    };
};
