const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b2f55c311bd60c18e278d668a3b57d84&query=${latitude},${longitude}&units=f`

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There are currently ${body.current.precip} inch(es) of precipitation.`)
    }
  })
}

module.exports = forecast