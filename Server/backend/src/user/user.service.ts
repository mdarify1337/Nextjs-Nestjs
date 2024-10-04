import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSignUpUser } from '../userform/signup.entity';
import { User } from './user.entity'
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserDto } from './dto/create.user.dto';
import { userSignUpDto } from './dto/create.signup.dto';
import * as bcrypt from 'bcrypt';
import { userSignInDto } from './dto/create.signin.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly http: HttpService,
        private readonly jwtService: JwtService,
    ) {
    }

    async createUser(createUserDto: Partial<User>):Promise<any> {
        console.log('user dkhal hna 1.1')
        const {username, email, password, confirmPassword } = createUserDto;
        console.log('userdto -> ',createUserDto)
        if (password !== confirmPassword) {
          throw new BadRequestException('Passwords do not match');
        }
    
        
        let existUser = await this.userRepository.findOne({
            where : {email: email},
        })
        if (existUser) {
            const updatesignup =  await this.userRepository.save(existUser);
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
            const object =  await this.userRepository.save(user);
            console.log('object -> ', object);
            return {user: object,firstLogin: true};
        } catch(error) {
            console.log('error create user with singup -> ',error)
        }
    }
    
    async signIn(signInDto: userSignInDto) {
        console.log('user dkhal hna 2.1');
        const { email, password } = signInDto;
        console.log('signInDto -> ',signInDto)
        const user = await this.userRepository.findOne({
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

    async findOrcreateUser(createUser: Partial<User>): Promise<any> {
        const user: User = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.username = createUser.username;
        user.email = createUser.email;
        user.picture = createUser.picture;
        user.provider = createUser.provider;
        user.password = createUser.password;
        let existingUser = await this.userRepository.findOne({
            where: [
                { email: user.email },
                { username: user.username },
                { firstName: user.firstName },
                { lastName: user.lastName }
            ],
        });
        console.log('createuserbyemail -> ', createUser.email);
        if (existingUser) {
            const updatedUser = await
                this.userRepository.save(existingUser);
            console.log('User already exists:', updatedUser);
            return { user: updatedUser, firstLogin: false };
        }
        try {
            const object = await this.userRepository.save(user);
            console.log('User created:', object);
            return { user: object, firstLogin: true };
        }
        catch (e) {
            console.log(e)
        }
    }

    async findAllUsers(): Promise<User[]> {
        console.log('all users  from db -> ',await this.userRepository.find());
        return await this.userRepository.find();
    }

    async viewUser(id: string): Promise<User | null> {
        // console.log('Id of user -> :', id)
        try {
            return await this.userRepository.findOne(
                { where: { id} });
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async viewUserEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne(
                { where: { email } });
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async generateAccessToken(user: any): Promise<string> {
        const payload = {
            user: user.user,
            provider: user.user.provider,
        };
        return this.jwtService.signAsync(payload);
    }
    getCookie(cookieName: string, cookies: string): string {
        const array = cookies.split(';');
        for (let index = 0; index < array.length; index++) {
            const cookie = array[index];
            if (cookies.startsWith(cookieName + '=')) {
                return cookies.substring(cookieName.length + 1);
            }
        }
        return null;
    }

    async getGoogleProfile(token: string): Promise<any> {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }

    async decodetAccessToken(request: any) 
    {
        let cookie = request.cookies['access_token'];
        let validcookie :string = 'access_token=' + cookie;
        const authToken = this.getCookie('access_token', validcookie);
        if (!authToken) 
        {
            console.error('Access token not found in cookies or Authorization header');
            throw new Error('Unauthorized: No access token provided');
        }
        try {
            const authTokenPayload = await this.jwtService.verifyAsync(authToken, {
                secret: process.env.GOOGLE_SECRET,
            });
            return authTokenPayload;
        } catch (error) {
            console.error('Error decoding token:', error);
            throw new Error('Invalid token');
        }
    }

    async getUsersSortedByUsername(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users.sort((a, b) => a.username.localeCompare(b.username));
      }
}

