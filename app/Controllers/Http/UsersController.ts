import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import StoreValidator from 'App/Validators/user/StoreValidator'
import UpdateValidator from 'App/Validators/user/UpdateValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {

  public async index ({ view, auth, bouncer, response, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const users = await Database.from(User.table).paginate(page, 5)
    //console.log(users.getUrlsForRange(1, users.lastPage))
    if (await bouncer.can('view', auth.user)) {
      return view.render('pages/manager/users/index', {
        users
      })
    }
    return response.redirect().toRoute('home')
  }

  public async show ({ params, view, bouncer, auth, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    if (await bouncer.can('view', auth.user)) {
      return view.render('pages/manager/users/show', {
        user
      })
    }

    return response.redirect().toRoute('home')
  }

  public async create ({ view, auth, bouncer, response}: HttpContextContract) {
    if (await bouncer.can('view', auth.user)) {
      const user = new User()
      return view.render('pages/manager/users/create', {
        user
      })
    }
    return response.redirect().toRoute('home')
  }

  public async store ({ request, bouncer, auth, response, session }: HttpContextContract) {
    if (await bouncer.can('view', auth.user)) {
      const data = await request.validate(StoreValidator)
      await User.create({
        ...data,
      })

      session.flash({
        success: "Utilisateur Créer"
      })

      return response.redirect().toRoute('manager.users')
    }
    return response.redirect().toRoute('home')

  }

  public async update ({ request, params, response }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    const data = await request.validate(UpdateValidator)
    await user!.merge(data).save()

    return response.redirect().toRoute('manager.users')
    // Redirigé sur le panel (possibilité)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user!.delete()

    return response.redirect().toRoute('manager.users')
  }
}
