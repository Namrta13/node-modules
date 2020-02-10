const path = require('path')
const express = require('express')
const hbs = require('hbs')

//console.log(__dirname)// path to the directory the file resides
//console.log(__filename)// exact path to the file
//console.log()// path manipulation
console.log(path.join(__dirname, '../public/about'))
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//Partials
const partialsPath = path.join(__dirname, '../templates/partials')

//To server another directory to customize server
//Setting template engine using hbs
app.set('view engine', 'hbs')
//custom location for views
app.set('views', viewsPath)
//register partials
hbs.registerPartials(partialsPath)




//set up static directory to work
app.use(express.static(publicDir))
//Route to use hbs file instead of htmls
app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather!!!',
        name: 'Namrta'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About the Page!!',
        name: 'Namrta'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        message: 'This is the required help page!!!',
        title: 'Help',
        name: 'Namrta'
    })
})
//  not necessary as express by default serve
//sending JSON response
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Namrta',
//         age: 24
//     }, {
//         name: 'Divya'
//     }])
// })

// //set new routes
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page!!</h1>')
// })

//sending HTML response
app.get('/weather', (req, res) => {
    //res.send('Weather Page!!')
   // res.send('<h1>Weather Page!!<h1>')
   res.send({
       place: 'Boston',
       forecast: 53,
       precipitation: 0

   })
})
//suppose we have a website app.com so if someone visit we have to route them
//app.com/help
//app.com/about

//to define the port and connect to server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})