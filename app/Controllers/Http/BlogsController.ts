import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HtmlConfig, NotionClient } from 'notion-parser'
import Cache from '@ioc:Adonis/Core/Cache'
import Post from 'App/Models/Post'

export default class BlogsController {

  public async show ({view}: HttpContextContract) {
    const token = 'secret_D2FTkXPj9N9OwNV6kmYHlLIwHI7DGhUdHHhuIbZJ7UC'
    const notionClient = new NotionClient(token, '2022-02-22')

    const pageId: string = '726d4b82289c4acbbffe63d937d69af4'

    if (!Cache.get(pageId)) {
      //const page = await notionClient.getPage(pageId)
      const blocs = await notionClient.getBlocks(pageId)

      const options: HtmlConfig = {
        separator: '\n\n',
        h1: 'text-4xl text-white'
      }

      const html = blocs.reduce((acc: string, block) => acc += block.render(options) , '')
      Cache.put(pageId, html)
    }
    return view.render('pages/notion', {
      content: Cache.get(pageId)
    })
  }

  public async get ({view, request}: HttpContextContract) {
    const page = request.input('page', 1)
    const posts = await Post.query().paginate(page, 5)

    return view.render('pages/blogs', {
      posts
    })
  }
}
