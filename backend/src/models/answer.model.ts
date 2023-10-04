import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import Question from './question.model'
import User from './users.model'

@Table({ tableName: 'ANSWERS' })
export default class Answer extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'ANSWER_ID',
    defaultValue: DataType.UUIDV4,
  })
  answerId: string

  @Column({
    type: DataType.STRING(225),
    field: 'TITLE',
    allowNull: true,
  })
  answerText: string | null

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'ORDER',
  })
  scaleValue: number | null

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'QUESTION_ID',
  })
  questionId: string

  @BelongsTo(() => Question)
  question: Question

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    field: 'USER_ID',
  })
  userId: string | null
  
  @BelongsTo(() => User)
  user: User
}
