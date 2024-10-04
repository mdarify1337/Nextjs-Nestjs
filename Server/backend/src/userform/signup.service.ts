import { 
        BadRequestException, 
        ConflictException, 
        Injectable, 
        UnauthorizedException 
    } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSignUpUser } from './signup.entity';
import * as bcrypt from 'bcrypt';
import { userSignInDto } from '../user/dto/create.signin.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export  class   SignUpService{
    constructor(
        @InjectRepository(CreateSignUpUser)
        private readonly createsignupuser: Repository<User>,
        private readonly jwtService: JwtService,
    ) {   
    }

    async createUser(createUserDto: Partial<User>):Promise<any> {
        console.log('user dkhal hna 1.2')
        console.log('createuser before -> ', createUserDto);
        const {firstName, lastName, picture, provider, username, email, password, confirmPassword } = createUserDto;
        console.log('createuserdto after ->', createUserDto)
        console.log('password -> ', password, 'confirpassword -> ',confirmPassword)
        if (password !== confirmPassword) {
          throw new BadRequestException('Passwords do not match');
        }
        
        let existUser = await this.createsignupuser.findOne({
            where : {email: email},
        })
        if (existUser) {
            const updatesignup =  await this.createsignupuser.save(existUser);
            console.log('updatesignup -> ', updatesignup);
            return {user: updatesignup, firstLogin: false};
        }
        const user = new CreateSignUpUser();
        user.email = email;
        user.username = username;
        user.password = await bcrypt.hash(password, 10);
        user.confirmPassword = undefined;
        console.log('signup user -> ', user);
        try {
            const object =  await this.createsignupuser.save(user);
            console.log('object -> ', object);
            return {user: object, firstLogin: true};
        } catch(error) {
            console.log('error create user with singup -> ',error)
        }
    }

    async signIn(signInDto: userSignInDto) {
        console.log('user dkhal hna 2.2');
        const { email, password } = signInDto;
        console.log('signInDto -> ',signInDto)
        const user = await this.createsignupuser.findOne({
          where: { email: email },
        });
        console.log('user -> ', user)
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        console.log('Plain Password:', password, password.length);
        console.log('Hashed Password from DB:', user.password, user.password.length);
        const hashPassword = await bcrypt.hash(user.password, 10);
        console.log('hashed password -> ', hashPassword);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('isPasswordValid -> ', isPasswordValid)
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
        // Optional: If using JWT, generate a token
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
    
        return {
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
          },
        };
    }

    async findAllUsers(): Promise<User[]> {
      console.log('findallusers ->', await this.createsignupuser.find())
      return await this.createsignupuser.find();
    }
}

