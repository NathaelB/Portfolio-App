import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ContactService } from 'App/Services/ContactService'

export default class ContactsController {



  public async index({view}: HttpContextContract) {
    return view.render('pages/contact')
  }

  async store ({request, response}: HttpContextContract) {
    await ContactService.send(request.all() as any)

    return response.redirect().back()

  }
}
