import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Achievements extends BaseSchema {
  protected tableName = 'achievements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title')
      table.string('slug')
      table.string('description')
      table.string('category')
      table.string('banner')
      table.string('link')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
