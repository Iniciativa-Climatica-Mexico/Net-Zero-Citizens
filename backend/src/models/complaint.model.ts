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

export type ComplaintSubjectEnum =
  | 'Productos Defectuosos'
  | 'Inconformidad con el producto / servicio'
  | 'Comportamiento Inapropiado'
  | 'Mal Servicio'
  | 'Fraudes o estafas'
  | 'Violación legal o ética'

export type ComplaintStatusEnum = 'active' | 'inactive' | 'invalid'

@Table({ tableName: 'COMPLAINTS' })
export default class Complaint extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    field: 'COMPLAINT_ID',
  })
  complaintId: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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
    type: DataType.ENUM(
      'Productos Defectuosos',
      'Inconformidad con el producto / servicio',
      'Comportamiento Inapropiado',
      'Mal Servicio',
      'Fraudes o estafas',
      'Violación legal o ética'
    ),
    allowNull: false,
    field: 'COMPLAINT_SUBJECT',
  })
  complaintSubject: ComplaintSubjectEnum

  @Column({
    type: DataType.STRING(500),
    field: 'COMPLAINT_DESCRIPTION',
  })
  complaintDescription: string

  @Column({
    type: DataType.ENUM('active', 'inactive', 'invalid'),
    allowNull: false,
    field: 'STATUS',
  })
  complaintStatus: ComplaintStatusEnum
}