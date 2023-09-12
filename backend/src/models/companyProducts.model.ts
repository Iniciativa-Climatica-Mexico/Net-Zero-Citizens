import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey
} from 'sequelize-typescript'
import Company from './company.model'
import Products from './products.model'

@Table({ tableName: 'COMPANY_PRODUCTS' })
export default class CompanyProducts extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true,
    allowNull: false,
    field: 'COMPANY_PRODUCT_ID',
    unique: true,
  })
  companyProductId: string

  @ForeignKey(() => Products)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'PRODUCT_ID',
  })
  productId: string

  @ForeignKey(() => Company)
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'PDF_PRODUCT_CERTIFICATION_URL',
    unique: true,
  })
  pdfProductCertificationUrl: string

  @BelongsToMany(() => Company, { through: () => CompanyProducts })
  companies!: Company[]
  @BelongsToMany(() => Products, { through: () => CompanyProducts })
  products!: Products[]
}