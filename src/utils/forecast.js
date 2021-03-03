const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b80c3282435dd9a2f18c12bc2948b461&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,  ' It is currently '+ body.current.weather_descriptions + ' out here. With ' + body.current.temperature +' degrees of temperture and there is a ' + body.current.precip+ '% chance of rain.')
        }
    })
}

module.exports = forecast
// response.body.daily.data[0].summary +