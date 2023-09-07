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

export const CompaniesModel = db.define<Company>('COMPANIES', {
  companyId: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'COMPANY_ID',
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
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'NAME',
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'DESCRIPTION',
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'EMAIL',
    field: 'EMAIL',
  },
  location: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'LOCATION',
  },
  profilePicture: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'PROFILE_PICTURE',
  },
  status: {
    type: DataTypes.ENUM('approved', 'pending_approval', 'rejected'),
    allowNull: false,
    defaultValue: 'pending_approval',
    field: 'STATUS',
  },
  phoneNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: 'PHONE_NUMBER',
    field: 'PHONE_NUMBER',
  },
  webPage: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'WEB_PAGE',
  },
})
