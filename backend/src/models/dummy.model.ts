import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'

export interface Dummy
  extends Model<InferAttributes<Dummy>, InferCreationAttributes<Dummy>> {
  id: CreationOptional<number>
  name: string
  lastName: string
  createdAt?: Date
  updatedAt?: Date
}

export const DummyModel = db.define<Dummy>('Dummy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  lastName: DataTypes.STRING,
})
