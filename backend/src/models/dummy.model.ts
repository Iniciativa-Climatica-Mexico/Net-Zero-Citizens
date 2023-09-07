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
  dummyId: CreationOptional<number>
  name: string
  lastName: string
  createdAt?: Date
  updatedAt?: Date
}

export const DummyModel = db.define<Dummy>('DUMMIES', {
  dummyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'DUMMY_ID',
  },
  name: {
    type: DataTypes.STRING,
    field: 'NAME',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'LAST_NAME',
  },
})
