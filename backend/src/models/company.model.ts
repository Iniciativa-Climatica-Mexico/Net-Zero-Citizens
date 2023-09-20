import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import Review from './review.model'
import CompanyImage from './companyImage.model'

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
    field: 'STRET',
    type: DataType.STRING(255),
    allowNull: false,
  })
  street: string

  @Column({
    field: 'STREET_NUMBER',
    type: DataType.NUMBER,
    allowNull: false,
  })
  streetNumber: number

  @Column({
    field: 'CITY',
    type: DataType.STRING(255),
    allowNull: false,
  })
  city: string

  @Column({
    field: 'STATE',
    type: DataType.STRING(255),
    allowNull: false,
  })
  state: string

  @Column({
    field: 'ZIP_CODE',
    type: DataType.NUMBER,
    allowNull: false,
  })
  zipCode: number

  @Column({
    field: 'LATITUDE',
    type: DataType.NUMBER,
    allowNull: false,
  })
  latitude: number

  @Column({
    field: 'LONGITUDE',
    type: DataType.NUMBER,
    allowNull: false,
  })
  longitude: number

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
  pdfCurriculumUrl: string

  @Column({
    field: 'PDF_DIC_CDMX_URL',
    type: DataType.STRING(500),
    allowNull: true,
    unique: 'PDF_DIC_CDMX_URL',
  })
  pdfDicCdmxUrl: string

  @Column({
    field: 'PDF_PEE_FIDE_URL',
    type: DataType.STRING(500),
    allowNull: true,
    unique: 'PDF_PEE_FIDE_URL',
  })
  pdfPeeFideUrl: string

  @Column({
    field: 'PDF_GUARANTEE_SECURITY_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_GUARANTEE_SECURITY_URL',
  })
  pdfGuaranteeSecurityUrl: string

  @Column({
    field: 'PDF_ACTA_CONSTITUTIVA_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_ACTA_CONSTITUTIVA_URL',
  })
  pdfActaConstitutivaUrl: string

  @Column({
    field: 'PDF_INE_URL',
    type: DataType.STRING(500),
    allowNull: false,
    unique: 'PDF_INE_URL',
  })
  pdfIneUrl: string

  @Column({
    field: 'STATUS',
    type: DataType.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    defaultValue: 'pending_approval',
  })
  status: StatusEnum

  @Column({
    field: 'DEVICE_TOKEN',
    type: DataType.STRING(500),
    allowNull: true,
  })
  deviceToken: string

  @HasMany(() => Review)
  reviews: Review[]

  @HasMany(() => CompanyImage)
  products: CompanyImage[]
}
