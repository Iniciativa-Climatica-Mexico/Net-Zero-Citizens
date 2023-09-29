import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import Company from './company.model'

export type FileDescription =
  | 'INE representante legal'
  | 'Acta constitutiva'
  | 'Curriculum'
  | 'Directorio de instaladores certificados de CDMX'
  | 'Padron de empresas especializadas FIDE'
  | 'Certificaciones sistemas fotovoltaicos'
  | 'NOM-027-ENER/SCH-2018'
  | 'NMX-ES-004-NORMEX-2015'
  | 'Archivos presion mayor a 294k Pa'
  | 'Archivos presion menor a 294k Pa'
  | 'Carta de compromiso'
  | 'Imagen'
  | 'Otro' // EVITAR USAR ESTE VALOR

export type FileFormat =
  | '.jpg'
  | '.jpeg'
  | '.png'
  | '.pdf'
  | '.docx'
  | '.xlsx'
  | '.pptx'

@Table({ tableName: 'COMPANY_FILES' })
export default class CompanyFiles extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'COMPANY_FILE_ID',
    unique: true,
  })
  companyFileId: string

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
    type: DataType.STRING(500),
    allowNull: false,
    field: 'FILE_URL',
  })
  fileUrl: string | null

  @Column({
    type: DataType.ENUM(
      'INE representante legal',
      'Acta constitutiva',
      'Curriculum',
      'Directorio de instaladores certificados de CDMX',
      'Padron de empresas especializadas FIDE',
      'Certificaciones sistemas fotovoltaicos',
      'NOM-027-ENER/SCH-2018',
      'NMX-ES-004-NORMEX-2015',
      'Archivos presion mayor a 294k Pa',
      'Archivos presion menor a 294k Pa',
      'Carta de compromiso',
      'Imagen',
      'Otro'
    ),
    allowNull: false,
    field: 'FILE_DESCRIPTION',
  })
  fileDescription: FileDescription

  @Column({
    type: DataType.ENUM(
      '.jpg',
      '.jpeg',
      '.png',
      '.pdf',
      '.docx',
      '.xlsx',
      '.pptx'
    ),
    allowNull: true,
    field: 'FILE_FORMAT',
  })
  fileFormat: FileFormat
}
