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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create.user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto) {
        return this.userService.findOrcreateUser(createUserDto);
    }
    findAll() {
        return this.userService.findAllUsers();
    }
    async decodeAccessToke(req) {
        return this.userService.decodetAccessToken(req);
    }
    async findUser(id) {
        return this.userService.viewUser(id);
    }
    async findUserByEmail(email) {
        return await this.userService.viewUserEmail(email);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'User Created',
        type: create_user_dto_1.CreateUserDto
    }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        description: 'Create User',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User Created',
        type: create_user_dto_1.CreateUserDto
    }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(common_1.UseGuards),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('accessToken/:accessToken'),
    (0, common_1.UseGuards)(common_1.UseGuards),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "decodeAccessToke", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.UseGuards)(common_1.UseGuards),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, common_1.UseGuards)(common_1.UseGuards),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserByEmail", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map