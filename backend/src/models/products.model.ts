import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript'
import companyProducts from './companyProducts.model'

@Table({ tableName: 'PRODUCTS' })
export default class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    primaryKey: true,
    allowNull: false,
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
    field: 'DESCRIPTION',
    unique: true,
  })
  imageUrl: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'IMAGE_ALT_TEXT',
  })
  imageAltText: string

  // @HasMany(() => CompanyProducts)
  // companyProducts!: CompanyProducts[]
}