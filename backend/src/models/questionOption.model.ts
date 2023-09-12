import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import Question from './question.model'

@Table({ tableName: 'QUESTION_OPTIONS' })
export default class QuestionOption extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'QUESTION_OPTION_ID',
    defaultValue: DataType.UUIDV4,
  })
  questionOptionId: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'TEXT_OPTION',
  })
  textOption: string | null

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'QUESTION_ID',
  })
  questionId: string
}
