import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import QuestionOption from './questionOption.model'
import Answer from './answer.model'
import Survey from './survey.model'

@Table({ tableName: 'QUESTIONS' })
export default class Question extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'QUESTION_ID',
    defaultValue: DataType.UUIDV4,
  })
  questionId: string

  @Column({
    type: DataType.STRING(225),
    field: 'TITLE',
    allowNull: false,
  })
  questionText: string

  @Column({
    type: DataType.ENUM('multiple_choice', 'open', 'scale'),
    allowNull: false,
    field: 'QUESTION_TYPE',
  })
  questionType: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'IS_REQUIRED',
    defaultValue: true,
  })
  isRequired: boolean

  @ForeignKey(() => Survey)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'SURVEY_ID',
  })
  surveyId: string

  @HasMany(() => QuestionOption)
  questionOptions!: QuestionOption[]

  @HasMany(() => Answer)
  answers!: Answer[]
}
