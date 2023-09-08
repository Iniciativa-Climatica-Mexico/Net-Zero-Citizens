import { db } from '../configs/database.config'
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import User from './users.model'

/**
 * @brief
 * Interface con los atributos de la tabla de ecoinfo
 */

@Table({tableName: 'ECOINFO'})
export default class Ecoinfo extends Model {
  @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: 'ECOINFO_ID',
      field: 'ECOINFO_ID',
    })
    ecoinfoId: string

  @ForeignKey(() => User)
  @Column({
    field: 'USER_ID',
    type: DataType.UUID,
    allowNull: true,
    })
  userId: string | null

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'TITLE',
  })
  title: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'CONTENT',
  })
  content: string

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'SUBTITLE',
  })
  subtitle: string | null

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    field: 'COVER_IMAGE',
  })
  coverImage: string | null

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    field: 'AUTHOR',
  })
  author: string | null

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'DESCRIPTION',
  })
  description: string | null
}