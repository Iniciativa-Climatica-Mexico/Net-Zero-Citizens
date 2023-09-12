import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import Review from './review.model'
import CompanyImages from './companyImages.model'
import CompanyProducts from './companyProducts.model'
import Product from './products.model'
import User from './users.model'

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
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'COMPANY_ID',
    unique: true,
  })
  companyId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'USER_ID',
  })
  userId: string

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'NAME',
  })
  name: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'DESCRIPTION',
  })
  description: string

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'EMAIL',
    unique: true,
  })
  email: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: 'PHONE_NUMBER',
    unique: true,
  })
  phone: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'WEB_PAGE',
    unique: true,
  })
  webPage: string | null

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'STREET',
  })
  street: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'STREET_NUMBER',
  })
  streetNumber: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'CITY',
  })
  city: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'STATE',
  })
  state: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'ZIP_CODE',
  })
  zipCode: string

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    field: 'LATITUDE',
  })
  latitude: number

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    field: 'LONGITUDE',
  })
  longitude: number

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'PROFILE_PICTURE',
  })
  profilePicture: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'PDF_CURRICULUM_URL',
    unique: true,
  })
  pdfCurriculumUrl: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_DIC_CDMX_URL',
    unique: true,
  })
  pdfDicCdmxUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_PEE_FIDE_URL',
    unique: true,
  })
  pdfPeeFideUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'PDF_GUARANTEE_SECURITY_URL',
    unique: true,
  })
  pdfGuaranteeSecurityUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'PDF_ACTA_CONSTITUTIVA_URL',
    unique: true,
  })
  pdfActaConstitutivaUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
    field: 'PDF_INE_URL ',
    unique: true,
  })
  pdfIneUrl: string

  @Column({
    type: DataType.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    field: 'STATUS',
  })
  status: StatusEnum

  @HasMany(() => Review)
  reviews!: Review[]

  @BelongsToMany(() => Product, { through: () => CompanyProducts })
  products!: Product[]

  @HasMany(() => CompanyImages)
  images!: CompanyImages[]
}
