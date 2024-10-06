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
    import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userSignUpDto } from '../user/dto/create.signup.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { userSignInDto } from 'src/user/dto/create.signin.dto';
import {UserService} from 'src/user/user.service';

    @Controller('signup')
    @ApiTags('signup')
    export class SignUpController {
        constructor(
            private readonly signupservice: UserService,
        ){

        }
        @Post('signup')
        @UsePipes(new ValidationPipe({ whitelist: true }))
        async signup(@Body() createUserDto: CreateUserDto) {
            return this.signupservice.createUser(createUserDto);
        }

        @Post('signin')
        async signIn(@Body() signInDto: userSignInDto) {
            return this.signupservice.signIn(signInDto);
        }

        @Get('all')
        @UseGuards(UseGuards)
        findAll() {
            return  this.signupservice.findAllUsers();
        }
    }