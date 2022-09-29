import { JwtService } from '@nestjs/jwt';
import { QueryService } from '@nestjs-query/core';
import { UserEntity } from '../user/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthenticatedUser } from './auth.interfaces';
import { UserDTO } from '../user/user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: QueryService<UserEntity>, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<AuthenticatedUser | null>;
    currentUser(authUser: AuthenticatedUser): Promise<UserDTO>;
    login(user: AuthenticatedUser): Promise<LoginResponseDto>;
}
