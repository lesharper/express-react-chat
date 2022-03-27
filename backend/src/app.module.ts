import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import {UsersModule} from './users/users.module';
import {User} from "./users/users.model";
import { DiscussionsModule } from './discussions/discussions.module';
import {Discussion} from "./discussions/discussions.model";
import {UsersDiscussions} from "./discussions/users-discussions.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path"

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'lesharper',
            database: 'nchat',
            models: [User, Discussion, UsersDiscussions],
            autoLoadModels: true
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        UsersModule,
        DiscussionsModule,
        AuthModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],

})
export class AppModule {
}
