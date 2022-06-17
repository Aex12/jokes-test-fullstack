import './assets/global.css'
import ApiClient from './api-client'

const client = new ApiClient()

const elSetup = document.querySelector('#setup')
const elPunchline = document.querySelector('#punchline')

async function updateJoke () {
  const { setup, punchline } = await client.getRandomJoke()

  elSetup.innerText = setup
  elPunchline.innerText = punchline
  elPunchline.className = 'hidden'
}

function showPunchline () {
  elPunchline.className = 'unhide'
}

document.body.addEventListener('click', () => {
  if (elPunchline.className === 'hidden')
    showPunchline()
  else
    updateJoke()
})

updateJoke()
