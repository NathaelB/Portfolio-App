import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'

export default class TechnoAchievement extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public achievementId: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID (model: TechnoAchievement) {
    model.id = Generate.generateUUID()
  }
}
