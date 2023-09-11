import {Table, Model, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Company from './company.model'
import Product from './product.model'

@Table({tableName: 'COMPANY_PRODUCTS'})
export default class CompanyProduct extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    field: 'COMPANY_PRODUCT_ID',
  })
  companyProductId: string

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'PRODUCT_ID',
  })
  productId: string

  @BelongsTo(() => Company)
  company: Company

  @BelongsTo(() => Product)
  product: Product

  @Column({
    type: DataType.STRING(500),
    field: 'PDF_PRODUCT_CERTIFICATION_URL',
    allowNull: false,
    unique: true,
  })
  pdfProductCertificationUrl: string
}