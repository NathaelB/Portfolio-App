import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ManagersController {

  public async show ({ view, auth, bouncer, response }: HttpContextContract) {
    if (await bouncer.can('view', auth.user)) {
      return view.render('pages/manager/index')
    }
    return response.redirect().toRoute('home')
  }

}
