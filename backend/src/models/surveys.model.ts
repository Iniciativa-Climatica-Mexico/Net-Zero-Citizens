import { db } from '../configs/database.config'
import {
  UUIDV4,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize'
import { Question, QuestionsModel } from './questions.model'

export interface Survey
  extends Model<InferAttributes<Survey>, InferCreationAttributes<Survey>> {
  surveyId: CreationOptional<string>
  title: string
  description: string
  startDate?: Date
  endDate?: Date
  createdAt?: Date
  updatedAt?: Date

  // Asociaciones 1 a N, Estas van del lado de 1
  // En este caso un Survey pueden tener varias preguntas
  getQuestions: HasManyGetAssociationsMixin<Question>
  addQuestion: HasManyAddAssociationMixin<Question, string>
  addQuestions: HasManyAddAssociationsMixin<Question, string>
  setQuestions: HasManySetAssociationsMixin<Question, string>
  removeQuestion: HasManyRemoveAssociationMixin<Question, string>
  removeQuestions: HasManyRemoveAssociationsMixin<Question, string>
  hasQuestion: HasManyHasAssociationMixin<Question, string>
  hasQuestions: HasManyHasAssociationsMixin<Question, string>
  countQuestions: HasManyCountAssociationsMixin
  createQuestion: HasManyCreateAssociationMixin<Question>
}

export const SurveysModel = db.define<Survey>('SURVEYS', {
  surveyId: {
    type: DataTypes.UUID,
    field: 'SURVEY_ID',
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
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
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    field: 'END_DATE',
    allowNull: true,
  },
})

// Associations
SurveysModel.hasMany(QuestionsModel, {
  foreignKey: {
    name: 'surveyId',
    field: 'SURVEY_ID',
  },
})

QuestionsModel.belongsTo(SurveysModel, {
  foreignKey: {
    name: 'surveyId',
    field: 'SURVEY_ID',
  },
})
