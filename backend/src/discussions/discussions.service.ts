import {Injectable, UploadedFile} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Discussion} from "./discussions.model";
import {CreateDiscussionDto} from "./dto/create-discussion.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class DiscussionsService {
    constructor(@InjectModel(Discussion) private discussionRepository: typeof Discussion,
                private fileService: FilesService) {}

    async createDiscussion(dto: CreateDiscussionDto, image: any) {
        const fileName = await this.fileService.createFile(image)
        const discussion = await this.discussionRepository.create({...dto, poster: fileName})
        return discussion
    }

    async getAllDiscussions() {
        const discussions = await this.discussionRepository.findAll()
        return discussions
    }
}
