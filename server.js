const express = require('express');
const fs = require('fs');
const Sequelize = require('sequelize');
const rp = require('request-promise');


const app = express();

const DB_CONF = {
  user: 'root',
  password: 'secret',
  host: 'localhost',
  port: 3306,
  dbName: 'weather'
};

const KEY = 'ccbc58ec249d473a9a425ffcd35aa52e';

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

let sequelize = new Sequelize(DB_CONF.dbName, DB_CONF.user, DB_CONF.password, {
  host: DB_CONF.host,
  port: DB_CONF.port,
  dialect: 'mysql'
});

let Weather = sequelize.define('weather', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  city :Sequelize.STRING,
  temperature: Sequelize.DOUBLE,
  pressure: Sequelize.DOUBLE,
  humidity: Sequelize.DOUBLE,
  icon: Sequelize.STRING,
  description: Sequelize.STRING
});

Weather.sync();


function checkWeatherTime(weather, callback) {
  Weather.findOne({where: {id: weather.id}}).then(function(dbWeather) {
    let updateTime = new Date(dbWeather.updatedAt).getTime();
    let now = new Date().getTime();
    if(updateTime > now+3600){
      let updatingData = weather.city.split(',');

      getWeather(updatingData[0], updatingData[1], function(err, result) {
        if(!err){
          dbWeather.update({
            temperature: result.main.temp,
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            iconName: result.weather[0].icon,
            description: result.weather[0].description
          }).then(function() {
            callback({
              id: result.id,
              city: updatingData[0],
              temperature: result.main.temp,
              pressure: result.main.pressure,
              humidity: result.main.humidity,
              icon: result.weather[0].icon,
              description: result.weather[0].description
            });
          })
        } else {
          callback({error: 'Not found'});
        }
      })

    } else {
      callback(weather);
    }
  })
}

function getWeather(city, region, callback) {
  let weatherApiOptions = {
    method: 'GET',
    uri: 'http://api.openweathermap.org/data/2.5/weather?q='+city+','+region+'&units=metric&APPID='+KEY,
    json: true
  };
  rp(weatherApiOptions)
    .then(function(response) {
      callback(null, response);
    })
    .catch(function(err) {
      callback({ error: 'Not found' });
    })
}

app.get('/api/weather', (req, res) => {
  const city = req.query.city;
  const region = req.query.region;

  if (!city || !region) {
    res.status(400).json({
      error: 'Missing required params',
    });
    return;
  }

  Weather
    .findOne({ where: { city: city+','+region}})
    .then(function(weatherFromDb) {
      if(!weatherFromDb){
        getWeather(city, region, function(err, result) {
          if(!err){
            Weather.create({
              id: result.id,
              city: city,
              temperature: result.main.temp,
              pressure: result.main.pressure,
              humidity: result.main.humidity,
              icon: result.weather[0].icon,
              description: result.weather[0].description
            });
            res.json({
              id: result.id,
              city: city,
              temperature: result.main.temp,
              pressure: result.main.pressure,
              humidity: result.main.humidity,
              icon: result.weather[0].icon,
              description: result.weather[0].description
            });
          } else {
            res.status(500).json({
              error: 'Not found'
            })
          }
        });
      } else {
        checkWeatherTime(weatherFromDb, function(result) {
          res.json(result)
        });

      }
    })
});

app.get('/api/refresh_by_id', (req, res)=>{
  let id = req.query.id;
  Weather
    .findOne({where: {id:id}})
    .then(function(weather) {
      if(!weather){
        return res.json({error: 'Not found'});
      }
      let updatingData = weather.city.split(',');
      getWeather(updatingData[0], updatingData[1], function(err, result) {
        if(!err){
          weather.update({
            temperature: result.main.temp,
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            icon: result.weather[0].icon,
            description: result.weather[0].description
          });
          res.json({
            id: result.id,
            city: updatingData[0],
            temperature: result.main.temp,
            pressure: result.main.pressure,
            humidity: result.main.humidity,
            icon: result.weather[0].icon,
            description: result.weather[0].description
          });
        } else {
          res.status(500).json({
            error: 'Not found'
          })
        }
      })
    })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
