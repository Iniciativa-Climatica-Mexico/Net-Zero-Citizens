import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import Company from './company.model'
import Review from './review.model'
import Role from './role.model'


/**
 * @brief
 * User model
 */
@Table({ tableName: 'USERS' })
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    field: 'USER_ID',
  })
  userId: string

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'ROLE_ID',
  })
  roleId: string

  @BelongsTo(() => Role) // Define the association to Role
  role: Role // This will allow you to access the associated Role model

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'COMPANY_ID',
    unique: 'COMPANY_ID',
  })
  companyId: string

  @BelongsTo(() => Company)
  company: Company | null

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'GOOGLE_ID',
  })
  googleId: string | null

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'FACEBOOK_ID',
  })
  facebookId: string | null

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'APPLE_ID',
  })
  appleId: string | null

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'FIRST_NAME',
  })
  firstName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'LAST_NAME',
  })
  lastName: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'SECOND_LAST_NAME',
  })
  secondLastName: string | null

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'EMAIL',
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'PASSWORD',
  })
  password: string | null

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'PHONE_NUMBER',
  })
  phoneNumber: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'AGE',
  })
  age: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'STATE',
  })
  state: string

  @Column({
    type: DataType.ENUM('masculine', 'femenine', 'other', 'no_answer'),
    allowNull: false,
    field: 'SEX',
  })
  sex: 'masculine' | 'femenine' | 'other' | 'no_answer'

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'PROFILE_PICTURE',
  })
  profilePicture: string | null

  @HasMany(() => Review)
  reviews: Review[]
}
