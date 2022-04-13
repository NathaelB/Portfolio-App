import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    const user = await UserFactory.create()

    user!.related('avatar').create({
      userId: user.id,
      location: 'external',
      filename: 'https://i.pinimg.com/474x/cb/c1/41/cbc141bffcabec7414a84982e474a0ad.jpg',
    })
  }
}
