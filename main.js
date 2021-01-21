const api = 'http://ergast.com/api/f1'
const contentEl = document.querySelector('.content')

const err = (er) => {
  console.log(`dupa ${er}`)
}

const fetchApi = (endpoint) => {
  return fetch(`${api}${endpoint}`)
    .then(response => {
      if(response.ok) {
        return response}
      else {
      err('lol')
      throw Error(`Http error: ${response.status}`)
        }
    })
    .then(resp => resp.json())
    .catch(e => err(e))
}

setSeason = (season) => {
  const seasonEl = document.createElement('div')
  seasonEl.classList.add('content__season-wrapper')
  seasonEl.innerHTML = `
  <p class="content__season-text">Season:</p>
  <p class="content__season-data">${season}</p>`
  contentEl.appendChild(seasonEl)
}

setRound = (round) => {
  const roundEl = document.createElement('div')
  roundEl.classList.add('content__round-wrapper')
  roundEl.innerHTML = `
  <p class="content__round-text">Round:</p>
  <p class="content__round-data">${round}</p>`
  contentEl.appendChild(roundEl)
}

setContent = (data) => {
  console.log(data)
  const season = data.season
  const round = data.round
  const driverStandingsArray = data.DriverStandings
  console.log(season)
  console.log(round)
  console.log(driverStandingsArray)

  setSeason(season) 
  setRound(round) 
}

fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
