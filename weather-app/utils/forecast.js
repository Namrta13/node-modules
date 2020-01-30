const request = require('request')

const forecast = (long, lat, callback) => {
    const url='https://api.darksky.net/forecast/cc86519fe7f97605ae3b116025a3d8d5/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({url: url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find the location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast