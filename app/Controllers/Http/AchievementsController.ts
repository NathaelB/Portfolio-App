import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Achievement from 'App/Models/Achievement'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/achievement/StoreValidator'
import TechnoAchievement from 'App/Models/TechnoAchievement'
import {string } from '@ioc:Adonis/Core/Helpers'
const listeTechnos = [
  { value: "html", image: "html.jpeg" },
  { value: "css", image: "css.jpeg"},
  { value: "ts", image: "ts.jpeg"},
  { value: "nodejs", image: "node.jpeg"},
  { value: "adonis", image: "adonis.jpeg"},
  { value: "vue", image: "vue.jpeg"}
]
export default class AchievementsController {

  public async index ({ view, request, bouncer, response, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const achievements = await Database.from(Achievement.table).paginate(page, 8)
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
    const technos = await TechnoAchievement.query().where('achievementId', achievement!.id)
    return view.render('pages/achievement/show', {
      achievement,
      technos
    })
  }

  public async show ({ params, view, bouncer, auth, response}: HttpContextContract) {
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
    const slug = data.title.split(' ').join('-').toLowerCase()
   /* const achievement = await Achievement.create({
      ...data,
      slug: slug
    })*/
    const thumbnail = request.file('thumbnail')
    const newName = string.generateRandom(32) + '.' + thumbnail?.extname
    await thumbnail?.moveToDisk('./', {
      name: newName,
    })

    const achievement = await Achievement.create({
      ...data,
      slug: slug,
      banner: newName
    })


    if (request.input('technos')) {
      const technos = request.input('technos')
      await technos.forEach((item: string) => {
        const data = listeTechnos.find(element => item == element.value)
        TechnoAchievement.create({
          achievementId: achievement.id,
          image: data?.image
        })
      })
    }
    session.flash({
      success: "Item créé"
    })
    setTimeout(async () => {
      await session.flashMessages.clear()
    }, 5000)

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
