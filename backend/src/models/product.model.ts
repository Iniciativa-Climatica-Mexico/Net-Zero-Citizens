import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript'
import Company from './company.model'

@Table({ tableName: 'PRODUCTS' })
export default class Product extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'PRODUCT_ID',
    defaultValue: DataType.UUIDV4,
  })
  productId: string

  @Column({
    type: DataType.UUID,
    field: 'COMPANY_ID',
    allowNull: false,
  })
  companyId: string

  @BelongsTo(() => Company)
  company!: Company

  @Column({
    type: DataType.STRING(225),
    field: 'NAME',
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING(500),
    field: 'DESCRIPTION',
    allowNull: true,
  })
  description: string

  @Column({
    type: DataType.STRING(500),
    field: 'PDF_PRODUCT_CERTIFICATION_URL',
    allowNull: false,
    unique: true,
  })
  pdfProductCertificationUrl: string
}