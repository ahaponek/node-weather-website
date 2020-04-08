const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Haponek'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew Haponek'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Andrew Haponek',
    message: 'This is a help message'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  const input = req.query.address

  if (!input) {
    return console.log('Please provide a location!')
  }
  geocode(input, (error, { latitude, longitude, location } = {} ) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        location,
        forecast:forecastData,
        address: input
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Haponek',
    message: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Haponek',
    message: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})