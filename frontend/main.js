import './style.css'

async function fetchJokes () {
  const jokes = await fetch('')
}

document.querySelector('#app').innerHTML = `
  <h1>Random Joke Generator!</h1>
`
