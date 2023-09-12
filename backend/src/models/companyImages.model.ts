import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import Company from './company.model'

@Table({ tableName: 'COMPANY_PRODUCTS' })
export default class CompanyImages extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'COMPANY_IMAGE_ID',
    unique: true,
  })
  companyImageId: string

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'IMAGE_URL',
  })
  imageUrl: string | null

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'ALT_TEXT',
  })
  altText: string | null

  @BelongsTo(() => Company)
  company: Company
}
