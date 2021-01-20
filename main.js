fetch('http://ergast.com/api/f1/current/driverStandings.json')
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
