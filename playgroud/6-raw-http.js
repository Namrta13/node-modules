const https = require('https')

const url='https://api.darksky.net/forecast/cc86519fe7f97605ae3b116025a3d8d5/40,-45'

const request = https.request(url, (response) => {
 let data = ''
    response.on('data', (chunk) => {
        data = data + chunk.toString()
         
    })
    response.on('end', () => {
console.log(JSON.parse(data))
    })
})

request.on('error', (error) => {
    console.log(error)
})
request.end()