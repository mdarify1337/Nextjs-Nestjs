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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user/user.service");
const google_config_1 = require("./Configuration/google.config");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(googleConfiguration, userService) {
        super({
            clientID: googleConfiguration.clinetID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile'],
        });
        this.googleConfiguration = googleConfiguration;
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const email = profile.emails[0].value;
            const picture = profile._json.picture;
            const firstName = profile.name.familyName;
            const lastName = profile.name.givenName;
            const username = profile.displayName;
            const id = profile.id;
            const provider = profile.provider;
            var user = await this.userService.findOrcreateUser({
                email,
                firstName,
                lastName,
                picture,
                username,
                id,
                provider
            });
            console.log('UserValidate : ', user);
            const shortLivedAccessToken = await this.userService.generateAccessToken(user);
            return {
                user: user,
                firstLogin: user.firstLogin,
                appAccessToken: shortLivedAccessToken,
                providerAccessToken: accessToken
            };
        }
        catch (error) {
            done(null, error);
        }
    }
    serializeUser(user, done) {
        done(null, user.id);
    }
    deserializeUser(id, done) {
        this.userService.viewUser(id)
            .then((user) => done(null, user))
            .catch((error) => done(error));
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(google_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, user_service_1.UserService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map