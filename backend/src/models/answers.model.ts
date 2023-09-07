import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  UUIDV4,
} from 'sequelize'
import { Question } from './questions.model'

export interface Answer
  extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
  answerId: CreationOptional<string>
  answerText: string | null
  scaleValue: number | null

  // Asoaciaciones 1 a N, Estas van del lado de N
  // En este caso una respuesta solo puede pertenecer a una pregunta
  getQuestion: BelongsToGetAssociationMixin<Question>
  setQuestion: BelongsToSetAssociationMixin<Question, string>
}

export const AnswersModel = db.define<Answer>('ANSWERS', {
  answerId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'ANSWER_ID',
    defaultValue: UUIDV4,
  },
  answerText: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'ANSWER_TEXT',
  },
  scaleValue: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'SCALE_VALUE',
  },
})
