import { Table, Column, Model, DataType } from 'sequelize-typescript'

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