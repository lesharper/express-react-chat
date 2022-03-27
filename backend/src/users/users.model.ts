import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger";
import {Discussion} from "../discussions/discussions.model";
import {UsersDiscussions} from "../discussions/users-discussions.model";


interface UserCreationAttrs {
    username: string
    email: string
    password: string
    avatar: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'lesharper', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    username: string

    @ApiProperty({example: 'nchat@mail.ru', description: 'Почта пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({example: '123456', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string

    @ApiProperty({example: '/img/myavatar.png', description: 'Путь до аватара'})
    @Column({type: DataType.STRING, allowNull: false})
    avatar: string

    @BelongsToMany(() => Discussion, () => UsersDiscussions)
    discussions: Discussion[]
}
