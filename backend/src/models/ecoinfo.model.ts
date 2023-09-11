import { Table, Column, Model, DataType } from 'sequelize-typescript'

/**
 * @brief
 * Interface con los atributos de la tabla de ecoinfo
 */

@Table({ tableName: 'ECOINFO' })
export default class Ecoinfo extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    unique: 'ECOINFO_ID',
    field: 'ECOINFO_ID',
  })
  ecoinfoId: string

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'POST_ID',
  })
  postId: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'COVER_IMAGE_URL',
  })
  coverImage: string | null

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'DESCRIPTION',
  })
  description: string | null
}
