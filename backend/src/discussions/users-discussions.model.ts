import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript'
import {ApiProperty} from "@nestjs/swagger";
import {Discussion} from "../discussions/discussions.model";
import {User} from "../users/users.model";

@Table({tableName: 'users_discussions', createdAt: false, updatedAt: false})
export class UsersDiscussions extends Model<UsersDiscussions> {

    @ApiProperty({example: '1', description: 'Идентификатор пользователя - беседы'})
    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Discussion)
    @ApiProperty({example: '1', description: 'Внешний ключ беседы'})
    @Column({type: DataType.INTEGER})
    discussion_id: number

    @ForeignKey(() => User)
    @ApiProperty({example: '1', description: 'Внешний ключ пользователя'})
    @Column({type: DataType.INTEGER})
    user_id: number

}
