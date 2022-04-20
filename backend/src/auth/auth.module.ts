import {forwardRef, MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";
import {JWT_SECRET} from "../constants";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: '24h'
            },
        }),
        FilesModule
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
