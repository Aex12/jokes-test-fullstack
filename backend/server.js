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

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

fastify.listen({ port, host: '0.0.0.0' })
  .then((address) => console.log(`server listening on ${address}`))
  .catch((err) => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
