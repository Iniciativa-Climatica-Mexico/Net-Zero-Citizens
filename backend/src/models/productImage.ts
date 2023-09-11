import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Product from './product.model'

@Table({ tableName: 'PRODUCT_IMAGES' })
export default class ProductImage extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'PRODUCT_IMAGE_ID',
    defaultValue: DataType.UUIDV4,
  })
  productImageId: string

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    field: 'PRODUCT_ID',
    allowNull: false,
  })
  productId: string

  @BelongsTo(() => Product)
  product!: Product

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