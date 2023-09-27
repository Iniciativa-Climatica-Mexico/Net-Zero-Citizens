import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import Company from './company.model'
import Products from './products.model'

/**
 * Modelo que representa la tabla COMPANY_PRODUCTS
 * @class
 */
@Table({ tableName: 'COMPANY_PRODUCTS' })
export default class CompanyProducts extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'COMPANY_PRODUCT_ID',
  })
  companyProductId: string

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'PRODUCT_ID',
  })
  productId: string

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'PDF_PRODUCT_CERTIFICATION_URL',
  })
  pdfProductCertificationUrl: string

  @BelongsTo(() => Company)
  company!: Company

  @BelongsTo(() => Products)
  product!: Products
}
