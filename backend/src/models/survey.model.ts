import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'
import Question from './question.model'

@Table({ tableName: 'SURVEYS' })
export default class Survey extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'SURVEY_ID',
    defaultValue: DataType.UUIDV4,
  })
  surveyId: string

  @Column({
    type: DataType.STRING(225),
    field: 'TITLE',
    allowNull: false,
  })
  title: string

  @Column({
    type: DataType.STRING(500),
    field: 'DESCRIPTION',
    allowNull: true,
  })
  description: string

  @Column({
    type: DataType.DATE,
    field: 'START_DATE',
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  startDate: Date

  @Column({
    type: DataType.DATE,
    field: 'END_DATE',
    allowNull: true,
  })
  endDate: Date

  @HasMany(() => Question)
  questions!: Question[]
}
