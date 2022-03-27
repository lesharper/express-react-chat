import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        JwtModule.register({
            secret: 'NESTNINJA',
            signOptions: {
                expiresIn: '24h'
            },
        }),
        FilesModule
    ]
})
export class AuthModule {
}
