import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'lesharper', description: 'Имя пользователя'})
    readonly username: string

    @ApiProperty({example: 'nchat@mail.ru', description: 'Почта пользователя'})
    readonly email: string

    @ApiProperty({example: '123456', description: 'Пароль пользователя'})
    readonly password: string

    @ApiProperty({example: '/img/myavatar.png', description: 'Путь до аватара'})
    readonly avatar: string

}
