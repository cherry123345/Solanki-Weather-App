const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhairya Solanki'
    })
})

app.get('/about',(req ,res) => {
    res.render('about', {
        title: 'About',
        name: 'Dhairya Solanki'
    })
})

app.get('/help',(req ,res) => {
    res.render('help', {
        helptext: 'Need Help?',
        title: 'Help',
        name: 'Dhairya Solanki'
    })
})


app.get('/weather',(req ,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

        geocode(req.query.address, (error, { latitude, longitude, location} = {} ) => {
            if(error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }
                
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

})



app.get('help/*',(req ,res) => {
    res.render('404', {
        title: '404',
        name: "Dhairya",
        errormessage: "Page not found"
    })
})

app.get('*',(req ,res) => {
    res.render('404', {
        title: '404',
        name: "Dhairya",
        errormessage: "Page not found"
    })
})


app.listen('3000', () => {
    console.log('got it boosss')
})


// app.get('/products', (req ,res) => {
//     if (!req.query.search){
//         res.send({
//             error: 'You must provide a search item'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product: []
//     })
// })