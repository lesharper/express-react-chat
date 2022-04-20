import {
    Body,
    Controller,
    Get,
    HttpException,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {User} from "../users/users.model";
import {JwtAuthGuard} from "./jwt-auth.guard";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@Body() userDto: CreateUserDto, @UploadedFile() avatar) {
        return this.authService.registration(userDto, avatar)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/check')
    check(@Req() req: any) {
        const user = req.user
        return this.authService.check(user)
    }
}
