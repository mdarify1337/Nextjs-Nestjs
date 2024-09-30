import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { userSignUpDto } from './dto/create.signup';
import { userSignInDto } from './dto/create.signin.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    signup(createUserDto: userSignUpDto): Promise<any>;
    signIn(signInDto: userSignInDto): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
    }>;
    findAll(): Promise<import("./user.entity").User[]>;
    decodeAccessToke(req: any): Promise<any>;
    findUser(id: string): Promise<import("./user.entity").User>;
    findUserByEmail(email: string): Promise<import("./user.entity").User>;
}
