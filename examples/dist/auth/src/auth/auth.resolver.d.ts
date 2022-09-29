import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginInputDTO } from './dto/login-input.dto';
import { UserDTO } from '../user/user.dto';
import { AuthenticatedUser } from './auth.interfaces';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(input: LoginInputDTO): Promise<LoginResponseDto>;
    me(user: AuthenticatedUser): Promise<UserDTO>;
}
