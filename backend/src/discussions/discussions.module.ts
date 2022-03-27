import { Module } from '@nestjs/common';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Discussion} from "./discussions.model";
import {User} from "../users/users.model";
import {UsersDiscussions} from "./users-discussions.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  imports: [
    SequelizeModule.forFeature([Discussion, User, UsersDiscussions]),
      FilesModule
  ],
})
export class DiscussionsModule {}
