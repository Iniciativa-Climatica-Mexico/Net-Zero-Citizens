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
import Complaint from './complaint.model'
import Favourites from './favourite.model'

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
  })
  companyId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'USER_ID',
  })
  userId: string | null

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
  })
  email: string

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: 'PHONE_NUMBER',
  })
  phone: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'WEB_PAGE',
  })
  webPage: string | null

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'STREET',
  })
  street: string

  @Column({
    type: DataType.STRING(50),
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
    type: DataType.STRING,
    allowNull: false,
    field: 'ZIP_CODE',
  })
  zipCode: string

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'PROFILE_PICTURE',
  })
  profilePicture: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_CURRICULUM_URL',
  })
  pdfCurriculumUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_DIC_CDMX_URL',
  })
  pdfDicCdmxUrl: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_PEE_FIDE_URL',
  })
  pdfPeeFideUrl: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_GUARANTEE_SECURITY_URL',
  })
  pdfGuaranteeSecurityUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_ACTA_CONSTITUTIVA_URL',
  })
  pdfActaConstitutivaUrl: string

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'PDF_INE_URL',
  })
  pdfIneUrl: string

  @Column({
    type: DataType.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    field: 'STATUS',
    defaultValue: 'pending_approval',
  })
  status: StatusEnum

  @HasMany(() => Review)
  reviews!: Review[]

  @BelongsToMany(() => Product, { through: () => CompanyProducts })
  products!: Product[]

  @HasMany(() => CompanyImages)
  images!: CompanyImages[]

  @HasMany(() => Complaint)
  complaints: Complaint[]

  @HasMany(() => Favourites)
  favourites: Favourites[]
}
