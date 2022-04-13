import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TechnoAchievements extends BaseSchema {
  protected tableName = 'techno_achievements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('achievement_id').notNullable()
      table.string('image').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
