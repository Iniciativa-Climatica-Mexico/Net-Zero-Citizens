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
  companyId: string
  userId: string
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

export const CompanyModel = db.define<Company>('Company', {
  companyId: {
    type: DataTypes.UUID,
    field: 'COMPANY_ID',
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type: DataTypes.STRING,
    field: 'USER_ID',
    allowNull: false,
    // Uncomment when User model is created
    // references: {
    //   model: 'users',
    //   key: 'USER_ID',
    // },
    // unique: 'FK_COMPANY_USER',
  },
  name: {
    type: DataTypes.STRING(255),
    field: 'NAME',
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    field: 'DESCRIPTION',
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    field: 'EMAIL',
    allowNull: false,
    unique: 'EMAIL',
  },
  location: {
    type: DataTypes.STRING(500),
    field: 'LOCATION',
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING(500),
    field: 'PROFILE_PICTURE',
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('approved', 'pending_approval', 'rejected'),
    field: 'STATUS',
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(10),
    field: 'PHONE_NUMBER',
    allowNull: false,
    unique: 'PHONE_NUMBER',
  },
  webPage: {
    type: DataTypes.STRING(255),
    field: 'WEB_PAGE',
    allowNull: true,
  },
})