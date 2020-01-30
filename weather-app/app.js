// console.log('Starting')

// setTimeout(() => {
// console.log('2 sec timer')
// }, 2000)

// setTimeout(() => {
// console.log('0 sec timer')
// }, 0)

// console.log('Stopping')

//HTTP request to the API for weather



//  const url = 'https://api.darksky.net/forecast/cc86519fe7f97605ae3b116025a3d8d5/37.8267,-122.4233'

//  request({url: url,
//  json: true}, (error, response) => {
//  //console.log(response)
//  //const data = JSON.parse(response.body)
//  //console.log(data.currently)
//  //console.log(response.body.currently)
//  if(error){
//      console.log('Unable to connect to weather service')
//  }
//  else if(response.body.error){
//       console.log('Unable to find the location')
//  } else {
//  console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//  } 
// })

// //Geo API to get the longitude and latidue of the location
//  const geourl ='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmFtcnRhMTMiLCJhIjoiY2s1ejR6dTcyMGJuMjN3cWc5MTB1NTJraSJ9.-zKUyNLEaidnrvM7QtyKCQ'

//  request({url: geourl, json: true}, (error, response) => {
//      if(error){
//          console.log('Service not working')
//      } else if(response.body.features.length === 0){
//          console.log('No matching results')
//      }
//      else{
//      console.log('Longitude: ' + response.body.features[0].center[0])
//      console.log('Latitude: ' + response.body.features[0].center[1])
//      }
//     })

//const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const value = process.argv[2]
console.log(process.argv)
if(value){
geocode(value, (error, {longitude, latitude, location}) => {
  if(error){
      return console.log(error)
  }  
    forecast(longitude, latitude, (error, forecastdata) => {
    if(error){
        return console.log(error)
    }
    console.log(location)
    console.log(forecastdata)
  })
})
}
else{
    console.log('Please enter a valid value')
}
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

