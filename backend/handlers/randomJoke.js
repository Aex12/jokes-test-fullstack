const knex = require('../knex')

module.exports = exports = async () => {
  const joke = await knex('jokes')
    .select(['id', 'setup', 'punchline'])
    .orderByRaw('RANDOM()')
    .limit(1)
    .first()

  return { ok: true, joke }
}
