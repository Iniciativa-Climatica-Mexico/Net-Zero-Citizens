import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript'
  import User from './users.model'
  import Company from './company.model'
  
  /**
   * @brief
   * Favourites model
   */
  @Table({ tableName: 'FAVOURITES' })
  export default class Favourites extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
      field: 'FAVOURITE_ID',
    })
    favouriteId: string
  
    @ForeignKey(() => Company)
    @Column({
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
      field: 'COMPANY_ID',
    })
    companyId: string
  
    @BelongsTo(() => Company)
    company: Company
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: true,
      defaultValue: DataType.UUIDV4,
      field: 'USER_ID',
    })
    userId: string | null
  
    @BelongsTo(() => User)
    user: User
  
    @Column({
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.NOW,
      field: 'SAVED_AT',
    })
    savedAt: string
  }