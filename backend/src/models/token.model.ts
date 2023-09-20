import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'TOKENS'})
export default class Tokens extends Model {
  @Column({
    type: DataType.STRING(500),
    primaryKey: true,
    field: 'TOKEN_ID',
  })
  tokenId: string
}