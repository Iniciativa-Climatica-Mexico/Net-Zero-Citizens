import { db } from '../configs/database.config'
import { DataTypes, Model } from 'sequelize'

/**
 * @interface User
 * @description User interface
 * @param {string} userId - The user's id
 * @param {number} roleId - The user's role id
 * @param {number} companyId - The user's company id
 * @param {number} googleId - The user's google id
 * @param {number} facebookId - The user's facebook id
 * @param {number} appleId - The user's apple id
 * @param {string} firstName - The user's first name
 * @param {string} lastName - The user's last name
 * @param {string} secondLastName - The user's second last name
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @param {string} phoneNumber - The user's phone number
 * @param {number} age - The user's age
 * @param {string} state - The user's state
 * @param {enum} sex - The user's sex
 * @param {string} profilePicture - The user's profile picture url
 * @param {date} createdAt - The user's creation date
 * @param {date} updatedAt - The user's update date
 */
export interface User extends Model {
  userId: string
  roleId: number
  companyId: number | null
  googleId: number | null
  facebookId: number | null
  appleId: number | null
  firstName: string
  lastName: string
  secondLastName: string
  email: string
  password: string | null
  phoneNumber: string
  age: number
  state: string
  sex: 'masculine' | 'femenine' | 'other' | 'no_answer'
  profilePicture: string | null
  createdAt?: Date
  updatedAt?: Date
}

/**
 * @function UserModel
 * @description Create the model for the users table
 */

export const UsersModel = db.define<User>(
  'USERS',
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'USER_ID',
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ROLE_ID',
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'COMPANY_ID',
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'GOOGLE_ID',
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appleId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'APPLE_ID',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'FIRST_NAME',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LAST_NAME',
    },
    secondLastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'SECOND_LAST_NAME',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'EMAIL', 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PASSWORD',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'PHONE_NUMBER',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'AGE',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'STATE',
    },
    sex: {
      type: DataTypes.ENUM('masculine', 'femenine', 'other', 'no_answer'),
      allowNull: false,
      field:'SEX',
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'PROFILE_PICTURE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'CREATED_AT',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'UPDATED_AT',
    },
  },
  {
    timestamps: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
  }
)

