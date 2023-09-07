import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface QuestionOption
  extends Model<
    InferAttributes<QuestionOption>,
    InferCreationAttributes<QuestionOption>
  > {
  questionOptionId: CreationOptional<string>
  questionId: string
  textOption: string
}

export const QuestionOptionsModel = db.define<QuestionOption>(
  'QUESTION_OPTIONS',
  {
    questionOptionId: {
      autoIncrement: true,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'QUESTION_OPTION_ID',
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'QUESTION_ID',
      references: {
        model: 'questions',
        key: 'QUESTION_ID',
      },
    },
    textOption: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'TEXT_OPTION',
    },
  },
  {
    tableName: 'QUESTION_OPTIONS',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'QUESTION_OPTION_ID' }],
      },
      {
        name: 'FK_QUESTION_OPTIONS_QUESTIONS',
        using: 'BTREE',
        fields: [{ name: 'QUESTION_ID' }],
      },
    ],
  }
)
