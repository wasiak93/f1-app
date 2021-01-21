const api = 'http://ergast.com/api/f1'

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

setContent = (data) => {
  console.log(data)
  const season = data.season
  const round = data.round
  const driverStandingsArray = data.DriverStandings
  console.log(season)
  console.log(round)
  console.log(driverStandingsArray)

}

fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
