import { db } from '../configs/database.config'
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  UUIDV4,
} from 'sequelize'

export interface Dummy
  extends Model<InferAttributes<Dummy>, InferCreationAttributes<Dummy>> {
  dummyId: CreationOptional<string>
  name: string
  lastName: string
  createdAt?: Date
  updatedAt?: Date
}

export const DummiesModel = db.define<Dummy>('DUMMIES', {
  dummyId: {
    type: DataTypes.UUID,
    primaryKey: true,
    field: 'DUMMY_ID',
    defaultValue: UUIDV4,
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
