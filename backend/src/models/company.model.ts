import { Column, DataType, Model, Table } from 'sequelize-typescript'

type StatusEnum = 'approved' | 'pending_approval' | 'rejected'

/**
 * @brief
 * El modelo que representa la tabla COMPANIES
 */
@Table({ tableName: 'COMPANIES' })
export default class Company extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: 'COMPANY_ID',
    type: DataType.INTEGER,
    allowNull: false,
  })
  companyId: number

  // @ForeignKey(() => User)
  @Column({ field: 'USER_ID', type: DataType.UUID, allowNull: false })
  userId: string

  @Column({ field: 'NAME', type: DataType.STRING(255), allowNull: false })
  name: string

  @Column({
    field: 'DESCRIPTION',
    type: DataType.STRING(500),
    allowNull: false,
  })
  description: string

  @Column({
    field: 'EMAIL',
    type: DataType.STRING(255),
    allowNull: false,
    unique: 'EMAIL',
  })
  email: string

  @Column({ field: 'LOCATION', type: DataType.STRING(500), allowNull: false })
  location: string

  @Column({
    field: 'PROFILE_PICTURE',
    type: DataType.STRING(500),
    allowNull: true,
  })
  profilePicture: string

  @Column({
    field: 'STATUS',
    type: DataType.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    defaultValue: 'pending_approval',
  })
  status: StatusEnum

  @Column({
    field: 'PHONE_NUMBER',
    type: DataType.STRING(10),
    allowNull: false,
    unique: 'PHONE_NUMBER',
  })
  phoneNumber: string

  @Column({ field: 'WEB_PAGE', type: DataType.STRING(255), allowNull: true })
  webPage: string
}
