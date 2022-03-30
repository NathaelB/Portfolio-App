import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import CacheService from '../services/Cache'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton("Adonis/Core/Cache", () => new CacheService())
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
