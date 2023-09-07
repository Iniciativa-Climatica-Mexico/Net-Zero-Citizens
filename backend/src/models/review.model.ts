import { db } from '../configs/database.config'
import { UsersModel } from './users.model'
import { CompanyModel } from './company.model'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface Review
    extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> { 
    reviewId: CreationOptional<number>
    userId: number
    companyId: number
    rating: number
    comment: string
    createdAt?: Date
    updatedAt?: Date
}

export const ReviewModel = db.define<Review>('REVIEWS', {
    reviewId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'REVIEW_ID',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: UsersModel,
          key: 'USER_ID',
        },
        unique: 'FK_REVIEW_USER',
        field: 'USER_ID',
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: CompanyModel,
          key: 'COMPANY_ID',
        },
        unique: 'FK_REVIEW_COMPANY',
        field: 'COMPANY_ID',
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'RATING',
    },
    comment: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'COMMENT',
    },
})