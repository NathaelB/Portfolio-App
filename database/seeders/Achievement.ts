import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AchievementFactory } from 'Database/factories'
//import { UserFactory } from 'Database/factories'

export default class AchievementSeeder extends BaseSeeder {
  public async run () {
    //await UserFactory.createMany(100)
    await AchievementFactory.createMany(100)
  }
}
