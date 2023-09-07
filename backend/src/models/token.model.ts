import { db } from '../configs/database.config'
import {
  DataTypes, 
  Model, 
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'

export interface Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  tokenId: string,
}

export const TokensModel = db.define<Token>('TOKENS', {
  tokenId: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'TOKEN_ID',
  }
})