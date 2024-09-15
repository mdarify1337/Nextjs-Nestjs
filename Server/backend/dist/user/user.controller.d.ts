import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<import("./user.entity").User[]>;
    decodeAccessToke(req: any): Promise<any>;
    findUser(id: string): Promise<import("./user.entity").User>;
    findUserByEmail(email: string): Promise<import("./user.entity").User>;
}
