const api = 'http://ergast.com/api/f1'
const contentInfoEl = document.querySelector('.content__info')
const contentInfoNamesArray = ['season', 'round']

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
  contentInfoEl.innerHTML += `
  <div class="content__${name}-wrapper">
  <p class="content__${name}-text">${name}:</p>
  <p class="content__${name}-data">${data[name]}</p>
  </div>`

}

setContent = (data) => {  
  const driverStandingsArray = data.DriverStandings
  console.log(data)
  console.log(driverStandingsArray)

  contentInfoEl.innerHTML = ""
  contentInfoNamesArray.map(name => setContentInfo(data,name))
}




fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
