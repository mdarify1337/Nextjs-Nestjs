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
    import { ApiTags } from '@nestjs/swagger';

    @Controller('SignUp')
    @ApiTags('SignUp')

    export class SignUpController {
        
    }