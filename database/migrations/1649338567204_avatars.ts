import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Avatars extends BaseSchema {
  protected tableName = 'avatars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('location').notNullable()
      table.string('filename').notNullable()
      table.string('user_id').unique()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
