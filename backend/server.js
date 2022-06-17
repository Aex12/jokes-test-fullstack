// Import dependencies
const path = require('path')
const Fastify = require('fastify')
const FastifyCors = require('@fastify/cors')
const FastifyStatic = require('@fastify/static')

// Production env
const fastifyOpts = process.env.NODE_ENV === 'production'
  ? {}
  : { logger: true }

// Load fastify
const fastify = Fastify(fastifyOpts)

// register fastify plugins
fastify.register(FastifyCors)

// serve the frontend app when running in production
if (process.env.NODE_ENV === 'production') {
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, '../frontend/dist'),
  })
}

// Declare routes
fastify.get('/allJokes', require('./handlers/allJokes'))
fastify.get('/randomJoke', require('./handlers/randomJoke'))

// custom error handler
fastify.setErrorHandler(function (error, _request, reply) {
  this.log.error(error)

  const replyObj = { ok: false }
  if (process.env.NODE_ENV !== 'production')
    replyObj['error'] = error

  reply.status(500).send(replyObj)
})

const PORT = process.env.PORT || 5000;

// Run the server
const start = async () => {
  try {
    await fastify.listen(parseInt(PORT, 10))
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
