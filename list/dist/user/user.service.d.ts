import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly http;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, http: HttpService, jwtService: JwtService);
    findOrcreateUser(createUser: Partial<User>): Promise<any>;
    findAllUsers(): Promise<User[]>;
    viewUser(id: string): Promise<User | null>;
    viewUserEmail(email: string): Promise<User | null>;
    generateAccessToken(user: any): Promise<string>;
    decodetAccessToken(accessToken: string): Promise<any>;
}
