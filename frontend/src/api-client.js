
export default class ApiClient {
  constructor () {
    this.BASE_URL = process.env.NODE_ENV === 'production'
      ? 'http://localhost:5000' // we should change this line to the production server when live
      : 'http://localhost:5000'
  }

  async fetch (path) {
    const req = await fetch(`${this.BASE_URL}${path}`)
    const res = await req.json()

    if (!res.ok) {
      throw { error: true, message: 'Received an error response from the backend' }
    }

    return res
  }

  async getJokes () {
    const res = await this.fetch('/jokes')
    return res.jokes
  }

  async getRandomJoke () {
    const res = await this.fetch('/randomJoke')
    return res.joke
  }
}
