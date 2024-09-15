import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly http: HttpService,
        private readonly jwtService: JwtService,

    ) {
    }

    async findOrcreateUser(createUser: Partial<User>): Promise<any> {
        const user: User = new User();
        user.firstName = createUser.firstName;
        user.lastName = createUser.lastName;
        user.username = createUser.username;
        user.email = createUser.email;
        user.picture = createUser.picture;
        user.provider = createUser.provider;
        user.googleToken = createUser.googleToken;

        let existingUser = await this.userRepository.findOne({
            where: [
                { email: user.email },
                { username: user.username },
                { firstName: user.firstName },
                { lastName: user.lastName }
            ],
        });

        if (existingUser) {
            existingUser.googleToken = user.googleToken;
            const updatedUser = await
                this.userRepository.save(existingUser);
            console.log('User already exists:', updatedUser);
            return { user: updatedUser, firstLogin: false };
        }

        const object = await this.userRepository.save(user);
        console.log('User created:', object);
        return { user: object, firstLogin: true };
    }

    async findAllUsers(): Promise<User[]> {
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
}

