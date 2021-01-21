const api = 'http://ergast.com/api/f1'
const contentInfoEl = document.querySelector('.content__info')
const contentStandingsEl = document.querySelector('.content__standings')
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

drawDriversTable = ({Constructors, Driver, points, position, wins }) => {
  console.log(Driver)
  console.log(Constructors)
  
 
  
  // const constructors = Constructors.map(constructor =>{
    // <div className="driver__constructors">${constructors}</div>
  // })

  const driverElement = `
  <div class="content__driver driver">
    <div className="driver__position">${position}</div>
    <div className="driver__name">${Driver.givenName}</div>
    <div className="driver__surname">${Driver.familyName}</div>
    <div className="driver__nationality">${Driver.nationality}</div>
   
    <div className="driver__points">${points}</div>
    <div className="drivers__wins">${wins}</div>
  </div>`

  contentStandingsEl.innerHTML += driverElement
}

setContent = (data) => {  
  const driversStandingsArray = data.DriverStandings

  contentInfoEl.innerHTML = ""
  contentInfoNamesArray.map(name => setContentInfo(data,name))

  driversStandingsArray.map(driver => drawDriversTable(driver))
}




fetchApi('/current/driverStandings.json')
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
