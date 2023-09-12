import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import User from './users.model'
import Company from './company.model'

@Table({ tableName: 'REVIEWS' })
export default class Review extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'REVIEW_ID',
  })
  reviewId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'USER_ID',
  })
  userId: string

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @BelongsTo(() => Company)
  company: Company

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'RATING',
  })
  rating: number

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'COMMENT',
  })
  comment: string
}
