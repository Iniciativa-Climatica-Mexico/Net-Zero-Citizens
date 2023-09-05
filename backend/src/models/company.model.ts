import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

type StatusEnum = 'approved' | 'pending_approval' | 'rejected'

export interface Company
  extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
  companyId: CreationOptional<number>
  userId: number
  name: string
  description: string
  email: string
  location: string
  profilePicture: CreationOptional<string>
  status: StatusEnum
  phoneNumber: string
  webPage: CreationOptional<string>
  createdAt?: Date
  updatedAt?: Date
}

export const CompanyModel = db.define<Company>('Dummy', {
  companyId: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'USER_ID',
    },
    unique: 'FK_COMPANY_USER',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'EMAIL',
  },
  location: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: 'PHONE_NUMBER',
  },
  webPage: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
})
