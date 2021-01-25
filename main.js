const api = 'http://ergast.com/api/f1'
const contentInfoEl = document.querySelector('.content__info')
const contentStandingsEl = document.querySelector('.content__standings')
const contentInfoNamesArray = ['season', 'round']
const buttonWrapperEl = document.querySelector('.app__buttons-wrapper')

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


// buttons section
const drawButtonYear = (year) => {
  const button = document.createElement('button')
  button.innerHTML= year
  button.addEventListener('click', () => getDrivers(year) )
  
  buttonWrapperEl.appendChild(button)
}

const getYears = () => {
  const actualYear = new Date().getFullYear()
  const firstYear = 1950
  const limit =  actualYear - firstYear

  fetchApi(`/seasons.json?limit=${limit}`)
  .then(data => {
    if(!data) return;
    
    let seasons = data.MRData.SeasonTable.Seasons.map(({season}) => season)
    seasons = [...seasons, "current"]      
    seasons.map(season => drawButtonYear(season))
    
  })
}
// end buttons section

// content section
setContentInfo = (data, name) => {
  contentInfoEl.innerHTML += `
  <div class="content__${name}-wrapper">
  <p class="content__${name}-text">${name}:</p>
  <p class="content__${name}-data">${data[name]}</p>
  </div>`

}

drawDriversTable = (driversArray) => {  
  driversArray.map(({constructors, id, name, nationality, number, points, position, surname, wins}) => {
    const driverElement = `
      <div class="content__driver driver">
      <div className="driver__position">${position}</div>
      <div className="driver__name">${name}</div>
      <div className="driver__surname">${surname}</div>
      <div className="driver__number">${number}</div>
      <div className="driver__nationality">${nationality}</div>
      <div className="driver__constructors">${constructors}</div>
      <div className="driver__points">${points}</div>
      <div className="drivers__wins">${wins}</div>
      </div>`
    
      contentStandingsEl.innerHTML += driverElement
  })  
}

setContent = (data) => {  
  const driversStandingsArray = data.DriverStandings
  let driversArray = []
  let id= 0;

  contentStandingsEl.innerHTML= ""
  contentInfoEl.innerHTML = ""

  contentInfoNamesArray.map(name => setContentInfo(data,name))

  driversStandingsArray.map(({Constructors, Driver, points, position, wins }) => {
    const {givenName, familyName, nationality, permanentNumber} = Driver
    const constructorsArray = Constructors.map(({name}) => name)
    const constructors = constructorsArray.join(', ')
 
    const driver = {
        id,
        position,
        name: givenName,
        surname: familyName,
        number: permanentNumber,
        nationality,
        points,
        wins,
        constructors
      }

    id++
    driversArray= [...driversArray, driver]
  })
  
  drawDriversTable(driversArray)
}

const getDrivers = (year) => {
  fetchApi(`/${year}/driverStandings.json`)
  .then(data => {
    if(!data) return;
    setContent(data.MRData.StandingsTable.StandingsLists[0])
  })
}
// end content section


// start App
const getStartData = () => {
  getDrivers('current')
  getYears()
}

window.addEventListener('DOMContentLoaded', getStartData())
