
declare module '@ioc:Adonis/Core/Cache' {

  interface CacheContract<T> {
    get (key: string): T | undefined
    put (key: string, value: T): void
    invalidate (): void
    forget (key: string): void
  }

  const Cache: CacheContract<unknown>
  export default Cache
}
