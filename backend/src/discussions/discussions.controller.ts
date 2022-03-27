import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DiscussionsService} from "./discussions.service";
import {Discussion} from "./discussions.model";
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Беседы')
@Controller('discussions')
export class DiscussionsController {
    constructor(private discussionsService:DiscussionsService) {}

    @ApiOperation({summary: 'Создание беседы'})
    @ApiResponse({status: 200, type: Discussion})
    @Post()
    @UseInterceptors(FileInterceptor('poster'))
    create(@Body() discussionDto: CreateDiscussionDto, @UploadedFile() poster) {
        return this.discussionsService.createDiscussion(discussionDto, poster)
    }

    @ApiOperation({summary: 'Получение всех бесед'})
    @ApiResponse({status: 200, type: [Discussion]})
    @Get()
    getAll() {
        return this.discussionsService.getAllDiscussions()
    }
}
