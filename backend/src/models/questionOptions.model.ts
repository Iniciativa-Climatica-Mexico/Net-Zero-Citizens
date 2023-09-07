import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize'
import { db } from '../configs/database.config'
import { Question } from './questions.model'

export interface QuestionOption
  extends Model<
    InferAttributes<QuestionOption>,
    InferCreationAttributes<QuestionOption>
  > {
  questionOptionId: CreationOptional<string>
  textOption: string

  // Asoaciaciones 1 a N, Estas van del lado de N
  // En este caso una opcion solo puede pertenecer a una pregunta
  getQuestion: BelongsToGetAssociationMixin<Question>
  setQuestion: BelongsToSetAssociationMixin<Question, string>
}

export const QuestionOptionsModel = db.define<QuestionOption>(
  'QUESTION_OPTIONS',
  {
    questionOptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'QUESTION_OPTION_ID',
      defaultValue: UUIDV4,
    },
    textOption: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'TEXT_OPTION',
    },
  }
)
