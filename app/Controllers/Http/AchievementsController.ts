import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achievement from 'App/Models/Achievement'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/achievement/StoreValidator'

export default class AchievementsController {

  public async index ({ view, request, bouncer, response, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const achievements = await Database.from(Achievement.table).paginate(page, 5)
    if (await bouncer.can('view', auth.user)) {
      return view.render('pages/manager/achievement/index', {
        achievements
      })
    }

    return response.redirect().toRoute('home')
  }

  public async get ({view, request}: HttpContextContract) {
    const page = request.input('page', 1)
    const achievements = await Achievement.query().paginate(page, 8)
    return view.render('pages/achievement/index', {
      achievements
    })
  }

  public async visit ({ params, view }: HttpContextContract) {
    const achievement = await Achievement.findBy('slug',params.id)
    return view.render('pages/achievement/show', {
      achievement
    })
  }

  public async show ({ params, view, bouncer, auth, response}: HttpContextContract) {
    console.log(params)
    const achievement = await Achievement.findOrFail(params.id)
    if (await bouncer.can('view', auth.user)) {
      return view.render('pages/manager/achievement/show', {
        achievement
      })
    }
    return response.redirect().toRoute('home')
  }

  public async create ({  view, bouncer, auth, response}: HttpContextContract) {
    if (await bouncer.can('view', auth.user)) {
      const achievement = new Achievement()
      return view.render('pages/manager/achievement/create', {
        achievement
      })
    }
    return response.redirect().toRoute('home')
  }

  public async store ({ request, session, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const slug = data.title.split(' ')
    await Achievement.create({
      ...data,
      slug: slug.join('-').toLowerCase()
    })
    session.flash({
      success: "Item créé"
    })
    return response.redirect().toRoute('manager.achievements')
  }

  public async destroy ({response, session, params}: HttpContextContract) {
    const achievement = await Achievement.findOrFail(params.id)
    await achievement.delete()
    session.flash({
      success: "L'achievement a bien été supprimé"
    })
    return response.redirect().toRoute('manager.achievements')
  }

}
