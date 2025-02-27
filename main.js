const api = 'http://ergast.com/api/f1'
const contentInfoEl = document.querySelector('.content__info-wrapper')
const contentStandingsEl = document.querySelector('.content__standings')
const contentInfoNamesArray = ['season', 'round']
const buttons = document.querySelector('.app__buttons')

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
  button.classList.add('app__button')
  button.innerHTML= year
  button.addEventListener('click', () => getDrivers(year) )
  
  buttons.appendChild(button)
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
  <div class="content__info">
  <p class="content__text">${name}: </p>
  <p class="content__data">${data[name]}</p>
  </div>`

}

drawDriversTable = (driversArray) => { 

  const setDriver = () => {
    const windowSize = window.innerWidth

    contentStandingsEl.innerHTML = ''

    driversArray.map(({constructors, name, nationality, points, position, surname}) => {
      const surnameCode = surname.slice(0,3).toUpperCase()
      
      const driverElement =  `
      <div class="content__driver driver">
      <div class="driver__element"><p>${position}</p></div>
      <div class="driver__element"><p>${windowSize < 800? (windowSize < 540? surnameCode : surname) : (`${name} ${surname}`)}</p></div>
      <div class="driver__element"><p>${nationality}</p></div>
      <div class="driver__element"><p>${constructors}</p></div>
      <div class="driver__element"><p>${points}</p></div>
      </div>`
     
      contentStandingsEl.innerHTML += driverElement
    })  
  }

  window.addEventListener('resize', setDriver) 
  setDriver()
}

setContent = (data) => {  
  const driversStandingsArray = data.DriverStandings;
  let driversArray = [];
  let id= 0;
  contentStandingsEl.innerHTML= ""
  contentInfoEl.innerHTML = ""

  contentInfoNamesArray.map(name => setContentInfo(data,name))

  driversStandingsArray.map(({Constructors, Driver, points, position, wins}) => {
    const {givenName, familyName, nationality, code} = Driver
    const constructorsArray = Constructors.map(({name}) => name)
    const constructors = constructorsArray.join(', ')
 
    const driver = {
        position,
        name: givenName,
        surname: familyName,
        nationality,
        points,
        constructors,
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
