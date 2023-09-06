import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface Answer
  extends Model<InferAttributes<Answer>, InferCreationAttributes<Answer>> {
  answerId: CreationOptional<number>
  questionId: number
  userId: number
  answerText: string
  scaleValue: number
}

export const AnswerModel = db.define<Answer>(
  'ANSWERS',
  {
    answerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'ANSWER_ID',
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'QUESTION_ID',
      references: {
        model: 'QUESTIONS',
        key: 'QUESTION_ID',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'USER_ID',
      references: {
        model: 'USERS',
        key: 'USER_ID',
      },
    },
    answerText: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'ANSWER_TEXT',
    },
    scaleValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'SCALE_VALUE',
    },
  },
  {
    tableName: 'ANSWERS',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'ANSWER_ID' }],
      },
      {
        name: 'FK_ANSWERS_SURVEYS',
        using: 'BTREE',
        fields: [{ name: 'SURVEY_ID' }],
      },
      {
        name: 'FK_ANSWERS_QUESTIONS',
        using: 'BTREE',
        fields: [{ name: 'QUESTION_ID' }],
      },
      {
        name: 'FK_ANSWER_USERS',
        using: 'BTREE',
        fields: [{ name: 'USER_ID' }],
      },
    ],
  }
)
