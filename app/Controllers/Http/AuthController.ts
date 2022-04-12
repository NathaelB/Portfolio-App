import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/user/StoreValidator'

export default class AuthController {


  public async login ({view}: HttpContextContract) {
    return view.render('pages/authentication/login')
  }

  public async register ({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  public async registerWeb ({request, response}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create({
      ...data,
      access: false
    })

    user!.related('avatar').create({
      userId: user.id,
      location: 'external',
      filename: 'https://i.pinimg.com/474x/cb/c1/41/cbc141bffcabec7414a84982e474a0ad.jpg',
    })

    //Avatar.$getRelation('userId').setRelated(avatar, user)
    return response.redirect().toRoute('home')
  }

  public async loginWeb ({ request, auth, response, session}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      await response.redirect().toRoute('home')
    } catch  {
      session.flash({error: "Identifiants Incorrects"})
      response.redirect().toRoute('login')
    }
  }

  public async logoutWeb ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }


}
