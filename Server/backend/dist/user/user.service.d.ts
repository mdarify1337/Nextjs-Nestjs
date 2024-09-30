import { Repository } from 'typeorm';
import { CreateSignUpUser } from './signup.entity';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { userSignInDto } from './dto/create.signin.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly http;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, http: HttpService, jwtService: JwtService);
    createUser(createUserDto: Partial<CreateSignUpUser>): Promise<any>;
    signIn(signInDto: userSignInDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
    }>;
    findOrcreateUser(createUser: Partial<User>): Promise<any>;
    findAllUsers(): Promise<User[]>;
    viewUser(id: string): Promise<User | null>;
    viewUserEmail(email: string): Promise<User | null>;
    generateAccessToken(user: any): Promise<string>;
    getCookie(cookieName: string, cookies: string): string;
    getGoogleProfile(token: string): Promise<any>;
    decodetAccessToken(request: any): Promise<any>;
}
