import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  HasOne,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript'
import Role from './role.model'
import Company from './company.model'
import Review from './review.model'

/**
 * @interface User
 * @description User interface
 * @param {string} userId - The user's id
 * @param {number} roleId - The user's role id
 * @param {number} companyId - The user's company id
 * @param {number} googleId - The user's google id
 * @param {number} facebookId - The user's facebook id
 * @param {number} appleId - The user's apple id
 * @param {string} firstName - The user's first name
 * @param {string} lastName - The user's last name
 * @param {string} secondLastName - The user's second last name
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @param {string} phoneNumber - The user's phone number
 * @param {number} age - The user's age
 * @param {string} state - The user's state
 * @param {enum} sex - The user's sex
 * @param {string} profilePicture - The user's profile picture url
 * @param {date} createdAt - The user's creation date
 * @param {date} updatedAt - The user's update date
 */

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
    defaultValue: DataType.UUIDV4,
  })
  roleId: string

  @BelongsTo(() => Role)
  role: Role

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'COMPANY_ID',
    defaultValue: DataType.UUIDV4,
  })
  companyId: string | null

  @BelongsTo(() => Company)
  company: Company

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
    allowNull: true,
    unique: true,
    field: 'PHONE_NUMBER',
  })
  phoneNumber: string | null

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
    field: 'GENDER',
  })
  gender: 'masculine' | 'femenine' | 'other' | 'no_answer'

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'PROFILE_PICTURE',
  })
  profilePicture: string | null

  @HasMany(() => Review)
  reviews: Review[]
}
