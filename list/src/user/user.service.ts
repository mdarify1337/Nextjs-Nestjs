import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
// import { CreateUserDto } from './dto/create.user.dto';

// Initialize OAuth2Client with your Google Client ID
 // Replace with your actual Client ID


@Injectable()
export class UserService {
    // private readonly oauthClient: OAuth2Client;
    constructor (
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly http: HttpService,
        private readonly jwtService: JwtService,
        
    ) {
        // this.oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
        try {
            return await this.userRepository.findOne(
                { where: { id } });
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async viewUserEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne(
                { where: { email} });
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

    async decodetAccessToken(accessToken: string) {
        try {
            console.log('accessTOken ',accessToken)
            const authTokenPayload = await  this.jwtService.verify(accessToken);
            return authTokenPayload;
        } catch (error) {
            console.error('Error decoding access token:', error);
        }
    }


}
