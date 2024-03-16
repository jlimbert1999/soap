import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/users/schemas/user.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(data: LoginDto): Promise<{
        token: string;
    }>;
    checkAuthStatus(user: User): Promise<{
        token: string;
    }>;
}
