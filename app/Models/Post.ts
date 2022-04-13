import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  public pageId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: Post) {
    model.id = Generate.generateUUID()
  }
}
