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
    id: CreationOptional<number>
    title: string
    description: string
    startDate?: Date
    endDate?: Date
    createdAt?: Date
    updatedAt?: Date
}

export const SurveyModel = db.define<Survey>('Survey', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
})