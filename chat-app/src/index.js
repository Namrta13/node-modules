const path = require('path')
const express = require('express')

const publicDir = path.join(__dirname,'../public')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.send()
})

app.listen(port, () => {
    console.log('Server Up And Running')
})