import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import CacheService from '../services/Cache'
export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton("Adonis/Core/Cache", () => new CacheService())
    /*this.app.container.singleton('ContactService', (ioc: Ioc) => {
      return new ContactService('pro.nathaelbonnal@gmail.com', ioc.resolveBinding('Adonis/Addons/Mail'), ioc.resolveBinding('Adonis/Core/Validator'))
    })*/
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
