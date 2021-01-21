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


setContentInfo = (data, name) => {
  const element = document.createElement('div')
  element.classList.add(`content__${name}-wrapper`)
  element.innerHTML = `
  <p class="content__${name}-text">${name}:</p>
  <p class="content__${name}-data">${data}</p>`
  contentEl.appendChild(element)
}

setContent = (data) => {
  console.log(data)
  const season = data.season
  const round = data.round
  const driverStandingsArray = data.DriverStandings
  console.log(season)
  console.log(round)
  console.log(driverStandingsArray)

  setContentInfo(round, 'round')
  setContentInfo(season, 'season')
}

fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
