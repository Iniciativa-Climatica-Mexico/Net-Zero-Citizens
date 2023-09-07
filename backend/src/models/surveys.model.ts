import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface Survey
  extends Model<InferAttributes<Survey>, InferCreationAttributes<Survey>> {
  surveyId: CreationOptional<number>
  title: string
  description: string
  startDate?: Date
  endDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export const SurveysModel = db.define<Survey>(
  'SURVEYS',
  {
    surveyId: {
      type: DataTypes.INTEGER,
      field: 'SURVEY_ID',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(225),
      field: 'TITLE',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      field: 'DESCRIPTION',
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      field: 'START_DATE',
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      field: 'END_DATE',
      allowNull: false,
    },
  },
  {
    tableName: 'SURVEYS',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'SURVEY_ID' }],
      },
    ],
  }
)
