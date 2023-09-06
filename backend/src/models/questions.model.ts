import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface Question
  extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  questionId: CreationOptional<number>
  surveyId: number
  questionText: string
  questionType: string
}

export const QuestionsModel = db.define<Question>(
  'QUESTIONS',
  {
    questionId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'QUESTION_ID',
      references: {
        model: 'SURVEYS',
        key: 'QUESTION_ID',
      },
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SURVEY_ID',
      references: {
        model: 'SURVEYS',
        key: 'SURVEY_ID',
      },
    },
    questionText: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'QUESTION_TEXT',
    },
    questionType: {
      type: DataTypes.ENUM('multiple_choice', 'open', 'scale'),
      allowNull: false,
      field: 'QUESTION_TYPE',
    },
  },
  {
    tableName: 'QUESTIONS',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'QUESTION_ID' }],
      },
      {
        name: 'FK_QUESTIONS_SURVEYS',
        using: 'BTREE',
        fields: [{ name: 'SURVEY_ID' }],
      },
    ],
  }
)
