import { db } from '../configs/database.config'
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
        // Uncomment when User model is created
        // references: {
        //   model: 'USERS',
        //   key: 'USER_ID',
        // },
        // unique: 'FK_COMPANY_USER',
        field: 'USER_ID',
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Uncomment when Company model is created
        // references: {
        //   model: 'COMPANIES',
        //   key: 'COMPANY_ID',
        // },
        // unique: 'FK_COMPANY_USER',
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
}, {
    tableName: 'REVIEWS',
    timestamps: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
})