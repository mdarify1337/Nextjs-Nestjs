import { 
    Body,
    Controller, 
    Get, 
    Param, 
    ParseUUIDPipe, 
    Post, 
    Req, 
    Res, 
    UseFilters, 
    UseGuards, 
    UsePipes,
    ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from '@nestjs/passport'; 
import { userSignUpDto } from './dto/create.signup.dto'
import { userSignInDto } from './dto/create.signin.dto';
import { User } from './user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  
    constructor(
		private readonly userService: UserService,
		) {}
    @Post()
    @ApiOkResponse(
      { 
        description: 'User Created', 
        type: CreateUserDto
      })
    @ApiBody(
      {
        type: CreateUserDto, 
        description: 'Create User', 
        required: true,
      })
    @ApiResponse(
      { 
        status: 201, 
        description: 'User Created', 
        type: CreateUserDto
      })
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.findOrcreateUser(createUserDto);
    }

    @Post('signup')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async signup(@Body() createUserDto: userSignUpDto) {
      return this.userService.createUser(createUserDto);
    }

    @Post('signin')
    async signIn(@Body() signInDto: userSignInDto) {
      return this.userService.signIn(signInDto);
    }

    @Get('all')
    @UseGuards(UseGuards)
    findAll() {
      return  this.userService.findAllUsers();
    }

    
    @Get('accessToken/:accessToken')
    @UseGuards(UseGuards)
    async decodeAccessToke(@Req() req){
      return this.userService.decodetAccessToken(req);
    }
    
    @Get('id/:id')
    @UseGuards(UseGuards)
    async findUser(@Param('id') id: string) {
        return  this.userService.viewUser(id);
    }
    
    @Get('email/:email')
    @UseGuards(UseGuards)
    async findUserByEmail(@Param('email') email: string) {
      return await this.userService.viewUserEmail(email);
    }

    @Get('sorted')
    async getUsersSortedByUsername(): Promise<User[]> {
      return this.userService.getUsersSortedByUsername();
    }

}

