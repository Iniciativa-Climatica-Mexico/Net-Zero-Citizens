import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import User from './users.model'
import Review from './review.model'

type StatusEnum = 'approved' | 'pending_approval' | 'rejected'

/**
 * @brief
 * El modelo que representa la tabla COMPANIES
 */
@Table({ tableName: 'COMPANIES' })
export default class Company extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    field: 'COMPANY_ID',
  })
  companyId: string

  @ForeignKey(() => User)
  @Column({
    field: 'USER_ID',
    type: DataType.UUID,
    allowNull: true,
  })
  userId: string | null

  @BelongsTo(() => User)
  user: User

  @Column({
    field: 'NAME',
    type: DataType.STRING(255),
    allowNull: false,
  })
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

  @Column({
    field: 'PHONE_NUMBER',
    type: DataType.STRING(10),
    allowNull: false,
    unique: 'PHONE_NUMBER',
  })
  phoneNumber: string

  @Column({
    field: 'WEB_PAGE',
    type: DataType.STRING(255),
    allowNull: true,
    unique: 'WEB_PAGE',
  })
  webPage: string

  @Column({
    field: 'STREET',
    type: DataType.STRING(255),
    allowNull: false,
  })
  street: string

  @Column({
    field: 'STREET_NUMBER',
    type: DataType.INTEGER,
    allowNull: false,
  })
  streetNumber: number

  @Column({
    field: 'CITY',
    type: DataType.STRING(50),
    allowNull: false,
  })
  city: string

  @Column({
    field: 'STATE',
    type: DataType.STRING(50),
    allowNull: false,
  })
  state: string

  @Column({
    field: 'ZIP_CODE',
    type: DataType.INTEGER,
    allowNull: false,
  })
  zipCode: number

  @Column({
    field: 'PROFILE_PICTURE',
    type: DataType.STRING(500),
    allowNull: true,
  })
  profilePicture: string

  @Column({
    field: 'PDF_CURRICULUM_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_CURRICULUM_URL',
  })
  pdfCurriculumURL: string

  @Column({
    field: 'PDF_DIC_CDMX_URL',
    type: DataType.STRING(500),
    allowNull: true,
    unique: 'PDF_DIC_CDMX_URL',
  })
  pdfDicCdmxURL: string

  @Column({
    field: 'PDF_PEE_FIDE_URL',
    type: DataType.STRING(500),
    allowNull: true,
    unique: 'PDF_PEE_FIDE_URL',
  })
  pdfPeeFideURL: string

  @Column({
    field: 'PDF_GUARANTEE_SECURITY_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_GUARANTEE_SECURITY_URL',
  })
  pdfGuaranteeSecurityURL: string

  @Column({
    field: 'PDF_ACTA_CONSTITUTIVA_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_ACTA_CONSTITUTIVA_URL',
  })
  pdfActaConstitutivaURL: string

  @Column({
    field: 'PDF_INE_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_INE_URL',
  })
  pdfINEURL: string

  @Column({
    field: 'STATUS',
    type: DataType.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    defaultValue: 'pending_approval',
  })
  status: StatusEnum

  @HasMany(() => Review)
  reviews: Review[]
}
