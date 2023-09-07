import { db } from '../configs/database.config'
import { Survey } from './surveys.model'
import { QuestionOption, QuestionOptionsModel } from './questionOptions.model'

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  UUIDV4,
} from 'sequelize'
import { Answer, AnswersModel } from './answers.model'

export interface Question
  extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  questionId: CreationOptional<string>
  questionText: string
  questionType: 'multiple_choice' | 'open' | 'scale'

  // Asoaciaciones 1 a N, Estas van del lado de N
  // En este caso una pregunta solo puede pertenecer a una encuesta
  getSurvey: BelongsToGetAssociationMixin<Survey>
  setSurvey: BelongsToSetAssociationMixin<Survey, string>

  // Asociaciones 1 a N, Estas van del lado de 1
  // En este caso una pregunta puede tener varias opciones
  getQuestionOptions: HasManyGetAssociationsMixin<QuestionOption>
  addQuestionOption: HasManyAddAssociationMixin<QuestionOption, string>
  addQuestionOptions: HasManyAddAssociationsMixin<QuestionOption, string>
  setQuestionOptions: HasManySetAssociationsMixin<QuestionOption, string>
  removeQuestionOption: HasManyRemoveAssociationMixin<QuestionOption, string>
  removeQuestionOptions: HasManyRemoveAssociationsMixin<QuestionOption, string>
  hasQuestionOption: HasManyHasAssociationMixin<QuestionOption, string>
  hasQuestionOptions: HasManyHasAssociationsMixin<QuestionOption, string>
  countQuestionOptions: HasManyCountAssociationsMixin
  createQuestionOption: HasManyCreateAssociationMixin<QuestionOption>

  // Asociaciones 1 a N, Estas van del lado de 1
  // En este caso una pregunta puede tener varias respuestas
  getAnswers: HasManyGetAssociationsMixin<Answer>
  addAnswer: HasManyAddAssociationMixin<Answer, string>
  addAnswers: HasManyAddAssociationsMixin<Answer, string>
  setAnswers: HasManySetAssociationsMixin<Answer, string>
  removeAnswer: HasManyRemoveAssociationMixin<Answer, string>
  removeAnswers: HasManyRemoveAssociationsMixin<Answer, string>
  hasAnswer: HasManyHasAssociationMixin<Answer, string>
  hasAnswers: HasManyHasAssociationsMixin<Answer, string>
  countAnswers: HasManyCountAssociationsMixin
  createAnswer: HasManyCreateAssociationMixin<Answer>
}

export const QuestionsModel = db.define<Question>('QUESTIONS', {
  questionId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    field: 'QUESTION_ID',
    defaultValue: UUIDV4,
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
})

QuestionsModel.hasMany(AnswersModel, {
  foreignKey: {
    name: 'questionId',
    field: 'QUESTION_ID',
  },
})

AnswersModel.belongsTo(QuestionsModel, {
  foreignKey: {
    name: 'questionId',
    field: 'QUESTION_ID',
  },
})

QuestionsModel.hasMany(QuestionOptionsModel, {
  foreignKey: {
    name: 'questionId',
    field: 'QUESTION_ID',
  },
})

QuestionOptionsModel.belongsTo(QuestionsModel, {
  foreignKey: {
    name: 'questionId',
    field: 'QUESTION_ID',
  },
})
