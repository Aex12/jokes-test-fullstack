const knex = require('../knex')

module.exports = exports = async () => {
  const jokes = await knex('jokes').select(['id', 'setup', 'punchline'])

  return { ok: true, jokes }
}
