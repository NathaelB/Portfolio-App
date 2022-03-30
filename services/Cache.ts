

export default class CacheService<T> {

  private collection: Map<string, T> = new Map<string, T>()

  public get (key: string): T | undefined {
    return this.collection.get(key)
  }

  public put (key: string, value: T) {
    this.collection.set(key, value)
    setTimeout(() => {
      this.forget(key)
    }, 3600000)
  }

  public forget (key: string): void {
    this.collection.delete(key)
  }
}
