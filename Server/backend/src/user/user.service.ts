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

    async addConnection(userId: string, connectionId: string): Promise<User> {
        const user = await this.userRepository.findOne({ 
            where: { id: userId }, 
            relations: ['connections'] 
        });
        const connection = await this.userRepository.findOne({ 
            where: { id: connectionId } 
        });
        if (!user || !connection) {
            throw new Error('User or connection not found');
        }
        const isAlreadyConnected = user.connections.some(conn => 
            conn.id === connection.id);
        if (isAlreadyConnected) {
            return user;
        }
        user.connections.push(connection);
        return this.userRepository.save(user);
    }
    
      

    async createUser(createUserDto: Partial<User>):Promise<any> {
        console.log('user dkhal hna 1.1')
        const 
            {
                username, email, password, confirmPassword, 
                firstName, lastName, provider, picture 
            } = createUserDto;
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
        const salt = await bcrypt.genSalt(10); // You can specify the salt rounds here
        // Hash the password with the salt
        user.password = await bcrypt.hash(password, salt)
        user.provider = 'signup';
        console.log('signup user -> ', user);
        try {
            const object =  await this.userRepository.save(user);
            console.log('object -> ', object);
            return {user: object,firstLogin: true};
        } catch(error) {
            console.log('error create user with singup -> ',error)
        }
    }

    async   update(id: string, payload: Partial<User>) {
        const User = await this.viewUser(id);
        if (!User)
            throw new Error('User Not Found, please try again');
        Object.assign(User, payload);
        return this.userRepository.save(User);
    }
    
    async signIn(signInDto: userSignInDto) 
    {
        console.log('user dkhal hna 2.1');
        const { email, password } = signInDto;
        const user = await this.userRepository.findOne({
          where: { email: email },
        });
        console.log('user -> ', user)
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        console.log('Plain Password:', password, password.length);
        console.log('Hashed Password from DB:', user.password, user.password.length);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('isPasswordValid -> ', isPasswordValid)
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials: please verify your email or password ');
        }
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
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
        user.jobTitle = createUser.jobTitle;
        user.createdMeetings = createUser.createdMeetings;
        let existingUser = await this.userRepository.findOne({
            where: [
                { email: user.email },
                { username: user.username },
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

    async generateAccessToken(user: any): Promise<any> {
        const payload = {
            user: user.user,
            provider: user.user.provider,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '7d',
        });
        console.log('payload backend -> ', payload);
        return {
            accessToken,
            refreshToken,
        };
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

    /*
        async login(user: any, response: Response) {
            const payload = { username: user.username, sub: user.userId };
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1h',
            });
            const refreshToken = this.jwtService.sign(payload, {
                secret: process.env.REFRESH_SECRET,
                expiresIn: '7d',
            });

            // Set the refresh token as an HTTP-only cookie
            response.cookie('refresh_token', refreshToken, {
                httpOnly: true,          // Prevents access by JavaScript
                secure: true,            // Set true if using HTTPS
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            });

            // Send back the access token to the client
            return response.json({ access_token: accessToken });
            }
    */

    async getGoogleProfile(token: string): Promise<any> {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }

    async decodetAccessToken(request: any) {
        console.log('request cookies -> ', request.cookies);
        const cookie = request.cookies['access_token'];
        if (!cookie) {
          console.error('Access token not found in cookies');
          throw new Error('Unauthorized: No access token provided');
        }
        const authToken = this.getCookie('access_token', `access_token=${cookie}`);
        if (!authToken) {
          console.error('Access token is invalid or missing');
          throw new Error('Unauthorized: No valid access token provided');
        }
      
        try {
          const authTokenPayload = await this.jwtService.verifyAsync(authToken, {
            secret: process.env.GOOGLE_SECRET, 
          });
          return authTokenPayload;
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            const refreshToken = request.cookies['refresh_token'];
            if (!refreshToken) {
                console.error('Refresh token not found');
                throw new Error('Unauthorized: Token has expired, and no refresh token is available');
            }
            try {
                const refreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, {
                  secret: process.env.GOOGLE_SECRET,
                });
        
                const newAccessToken = this.jwtService.sign({ 
                        userId: refreshTokenPayload.userId 
                    },
                    { 
                        secret: process.env.GOOGLE_SECRET, 
                        expiresIn: '7j' 
                    } 
                );
                request.cookies['access_token'] = newAccessToken;
                return this.jwtService.verifyAsync(newAccessToken, {
                  secret: process.env.GOOGLE_SECRET,
                });
              } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                throw new Error('Unauthorized: Invalid refresh token');
              }
          }
          console.error('Error decoding token:', error);
          throw new Error('Unauthorized: Invalid token');
        }
      }
      

    async getUsersSortedByUsername(): Promise<User[]> {
        const users = await this.userRepository.find();
        console.log('Users Soretd ->', users.sort((a, b) => a.username.localeCompare(b.username)))
        return users.sort((a, b) => a.username.localeCompare(b.username));
      }

}

