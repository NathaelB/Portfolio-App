import Factory, { FactoryContextContract } from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Achievement from 'App/Models/Achievement'

export const UserFactory = Factory
  .define(User, ({ faker }: FactoryContextContract) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      access: false
    }
  }).build()


export const AchievementFactory = Factory
  .define(Achievement, ({faker}: FactoryContextContract) => {
    return {
      title: faker.company.companyName(),
      description: faker.hacker.phrase(),
      category: 'WEBSITE'
    }
  }).build()
