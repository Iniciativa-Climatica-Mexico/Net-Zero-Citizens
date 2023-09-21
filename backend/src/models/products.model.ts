import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'
import Company from './company.model'
import CompanyProducts from './companyProducts.model'

@Table({ tableName: 'PRODUCTS' })
export default class Product extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'PRODUCT_ID',
    unique: true,
  })
  productId: string

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'NAME',
  })
  name: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'DESCRIPTION',
  })
  description: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'IMAGE_URL',
    unique: true,
  })
  imageUrl: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'IMAGE_ALT_TEXT',
  })
  imageAltText: string

  @BelongsToMany(() => Company, { through: () => CompanyProducts })
  companies!: Company[]
}
