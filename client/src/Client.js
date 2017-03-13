/* eslint-disable no-undef */
function search(query, cb) {
  let req = query.split(',');
  return fetch(`api/weather?city=${req[0]}&region=${req[1]}`, {
    accept: 'application/json',
  }).then(parseJSON)
    .then(cb);
}

function refreshCard(query, cb) {
  return fetch(`api/refresh_by_id?id=${query}`, {
    accept: 'application/json'
  }).then(parseJSON)
    .then(cb);
}


function parseJSON(response) {
  return response.json();
}

const Client = { search, refreshCard };
export default Client;