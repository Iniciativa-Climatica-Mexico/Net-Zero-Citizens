import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'
import User from './users.model'

@Table({ tableName: 'ROLES' })
export default class Role extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'ROLE_ID',
    defaultValue: DataType.UUIDV4
  })
  roleId: string

  @Column({
    type: DataType.STRING,
    field: 'NAME',
    allowNull: false,
  })
  name: string

  @HasMany(() => User)
  users!: User[]
}
