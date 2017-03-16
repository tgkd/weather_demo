export function getLocalCity() {
  let local = localStorage.getItem('city');
  return JSON.parse(local);
}

export function refreshLocalCity(newCityData, cb) {
  try {
    let local = localStorage.getItem('city');
    let JSONlocal = JSON.parse(local);
    let buf = [];
    JSONlocal.forEach((city) =>{
      if(city.id === newCityData.id){
        buf.push(newCityData);
      } else {
        buf.push(city);
      }
    });
    localStorage.city = JSON.stringify(buf);
    cb(null, buf);
  } catch(e) {
    cb(e);
  }
}

export function removeLocalCity(cityId, cb) {
  try {
    let local = localStorage.getItem('city');
    let JSONlocal = JSON.parse(local);
    let buf = [];
    JSONlocal.forEach((city) =>{
      if(city.id !== cityId){
        buf.push(city);
      }
    });
    localStorage.city = JSON.stringify(buf);
    cb(null, true);
  } catch(e) {
    cb(e);
  }
}