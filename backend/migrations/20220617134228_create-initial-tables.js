const jokes = require('../data/jokes.json')

exports.up = async function(knex) {
  // transactions are automatically handled by knex
  await knex.raw(`
    CREATE TABLE jokes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setup TEXT NOT NULL,
      punchline TEXT NOT NULL
    );
  `)

  for (const { setup, punchline } of jokes) {
    await knex('jokes').insert({ setup, punchline })
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw('DROP TABLE jokes;')
}
