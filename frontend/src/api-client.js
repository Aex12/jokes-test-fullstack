
export default class ApiClient {
  constructor () {
    this.BASE_URL = import.meta.env.PROD
      ? window.location.origin
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

  async getAllJokes () {
    const res = await this.fetch('/allJokes')
    return res.jokes
  }

  async getRandomJoke () {
    const res = await this.fetch('/randomJoke')
    return res.joke
  }
}
