import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UsersDiscussions} from "./users-discussions.model";


interface DiscussionCreationAttrs {
    title: string
    password: string
    anonymous: boolean
    description: string
    poster: string
}

@Table({tableName: 'discussions'})
export class Discussion extends Model<Discussion, DiscussionCreationAttrs> {

    @ApiProperty({example: '1', description: 'Идентификатор беседы'})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'ПКС-18-1', description: 'Название беседы'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string

    @ApiProperty({example: '123456', description: 'Пароль беседы'})
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    password: string

    @ApiProperty({example: 'true/false', description: 'Анонимность беседы'})
    @Column({type: DataType.BOOLEAN, unique: false, allowNull: true})
    anonymous: string

    @ApiProperty({example: 'Беседа для общения', description: 'Описание беседы'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description: string

    @ApiProperty({example: '/img/poster.png', description: 'Путь до постера беседы'})
    @Column({type: DataType.STRING, allowNull: false})
    poster: string

    @BelongsToMany(() => User, () => UsersDiscussions)
    users: User[]
}
