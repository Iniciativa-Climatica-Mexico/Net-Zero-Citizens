import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Company from './company.model'

@Table({ tableName: 'IMAGES' })
export default class CompanyImage extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'COMPANY_IMAGE_ID',
    defaultValue: DataType.UUIDV4,
  })
  companyImageId: string

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    field: 'COMPANY_ID',
    allowNull: false,
  })
  companyId: string

  @BelongsTo(() => Company)
  company!: Company

  @Column({
    type: DataType.STRING(500),
    field: 'IMAGE_URL',
    allowNull: false,
    unique: true,
  })
  imageUrl: string

  @Column({
    type: DataType.STRING(100),
    field: 'ALT_TEXT',
    allowNull: false,
  })
  altText: string
}
