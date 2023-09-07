import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'DUMMY' })
export default class Dummy extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    field: 'DUMMY_ID',
    defaultValue: DataType.UUIDV4,
  })
  dummyId: string

  @Column({ type: DataType.STRING, field: 'NAME' })
  name: string

  @Column({ type: DataType.STRING, field: 'LAST_NAME' })
  lastName: string
}
