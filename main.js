const api = 'http://ergast.com/api/f1'
const contentEl = document.querySelector('.content')
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


setContentInfo = (data, value) => {
  contentEl.innerHTML += `
  <div class="content__${value}-wrapper">
  <p class="content__${value}-text">${value}:</p>
  <p class="content__${value}-data">${data[value]}</p>
  </div>`

}

setContent = (data) => {  
  const driverStandingsArray = data.DriverStandings
  console.log(data)
  console.log(driverStandingsArray)

  contentEl.innerHTML = ""
  contentInfoNamesArray.map(value => setContentInfo(data,value))
}




fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
