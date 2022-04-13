import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Generate from '../../utils/GenerateUUID'
import Hash from '@ioc:Adonis/Core/Hash'
import Avatar from 'App/Models/Avatar'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public access: boolean

  @hasOne(() => Avatar)
  public avatar: HasOne<typeof Avatar>

  @column()
  public rememberMeToken?: string

  @beforeCreate()
  public static async createUUID (model: User) {
    model.id = Generate.generateUUID()
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
