import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Discussion} from "../discussions/discussions.model";
import {UsersDiscussions} from "../discussions/users-discussions.model";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Discussion, UsersDiscussions]),
    ],
    exports: [UsersService]
})
export class UsersModule {
}
