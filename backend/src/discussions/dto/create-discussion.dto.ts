import {ApiProperty} from "@nestjs/swagger";

export class CreateDiscussionDto {
    @ApiProperty({example: 'ПКС-18-1', description: 'Название беседы'})
    readonly title: string

    @ApiProperty({example: '123456', description: 'Пароль беседы'})
    readonly password: string

    @ApiProperty({example: 'true/false', description: 'Анонимность беседы'})
    readonly anonymous: boolean

    @ApiProperty({example: 'Беседа для общения', description: 'Описание беседы'})
    readonly description: string

    @ApiProperty({example: '/img/poster.png', description: 'Путь до постера беседы'})
    poster: string

}
