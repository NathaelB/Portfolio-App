import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'

export default class Avatar extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public location: string

  @column()
  public filename: string


  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Avatar) {
    model.id = Generate.generateUUID()
  }
}
