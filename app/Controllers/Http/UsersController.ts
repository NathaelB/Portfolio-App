import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import StoreValidator from 'App/Validators/user/StoreValidator'
import UpdateValidator from 'App/Validators/user/UpdateValidator'

export default class UsersController {

  public async index (): Promise<User[]> {
    return User.query()
  }

  public async show ({ params }: HttpContextContract) {
    return User.query()
      .where('email', params.id)
      .first()
  }

  public async store ({ request }: HttpContextContract): Promise<User> {
    const data = await request.validate(StoreValidator)
    return User.create(data)
  }

  public async update ({ request, params, response }: HttpContextContract) {
    const user = await User.findBy('email', params.id)
    const data = await request.validate(UpdateValidator)
    await user!.merge(data).save()

    return response.redirect().toRoute('welcome')
    // Redirigé sur le panel (possibilité)
  }

  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findBy('email', params.id)
    return user!.delete()
  }
}
