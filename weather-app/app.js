// console.log('Starting')

// setTimeout(() => {
// console.log('2 sec timer')
// }, 2000)

// setTimeout(() => {
// console.log('0 sec timer')
// }, 0)

// console.log('Stopping')

//HTTP request to the API

const request = require('request')

const url = 'https://api.darksky.net/forecast/cc86519fe7f97605ae3b116025a3d8d5/37.8267,-122.4233'

request({url: url,
json: true}, (error, response) => {
//console.log(response)
//const data = JSON.parse(response.body)
//console.log(data.currently)
//console.log(response.body.currently)
console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
})