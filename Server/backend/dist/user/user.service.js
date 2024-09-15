"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const axios_1 = require("@nestjs/axios");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
let UserService = class UserService {
    constructor(userRepository, http, jwtService) {
        this.userRepository = userRepository;
        this.http = http;
        this.jwtService = jwtService;
    }
    async findOrcreateUser(createUser) {
        const user = new user_entity_1.User();
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
            const updatedUser = await this.userRepository.save(existingUser);
            console.log('User already exists:', updatedUser);
            return { user: updatedUser, firstLogin: false };
        }
        const object = await this.userRepository.save(user);
        console.log('User created:', object);
        return { user: object, firstLogin: true };
    }
    async findAllUsers() {
        return await this.userRepository.find();
    }
    async viewUser(id) {
        try {
            return await this.userRepository.findOne({ where: { id } });
        }
        catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
    async viewUserEmail(email) {
        try {
            return await this.userRepository.findOne({ where: { email } });
        }
        catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
    async generateAccessToken(user) {
        const payload = {
            user: user.user,
            provider: user.user.provider,
        };
        return this.jwtService.signAsync(payload);
    }
    getCookie(cookieName, cookies) {
        const array = cookies.split(';');
        for (let index = 0; index < array.length; index++) {
            const cookie = array[index];
            if (cookies.startsWith(cookieName + '=')) {
                return cookies.substring(cookieName.length + 1);
            }
        }
        return null;
    }
    async getGoogleProfile(token) {
        const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
    }
    async decodetAccessToken(request) {
        let cookie = request.cookies['access_token'];
        let validcookie = 'access_token=' + cookie;
        const authToken = this.getCookie('access_token', validcookie);
        if (!authToken) {
            console.error('Access token not found in cookies or Authorization header');
            throw new Error('Unauthorized: No access token provided');
        }
        try {
            const authTokenPayload = await this.jwtService.verifyAsync(authToken, {
                secret: process.env.GOOGLE_SECRET,
            });
            return authTokenPayload;
        }
        catch (error) {
            console.error('Error decoding token:', error);
            throw new Error('Invalid token');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map