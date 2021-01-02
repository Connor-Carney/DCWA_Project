const express = require('express')
var app = express()
var bodyParser = require('body-parser');
const port = 3000

var mysqlDAO = require('./mysqlDAO');
var mongoDAO = require('./mongoDAO');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: false
}));

// List of links to the countries, cities and Heads of State
app.get('/', (req, res) => {
  res.send("<a href='/countryList'>List Countries</a> </br> <a href='/cityList'>List Cities</a> </br> <a href='/stateHead'>List Heads of State</a>")
})

// redirection to countries list
app.get('/countryList', (req, res) => {
  mysqlDAO.getCountries()
    .then((result) => {
      res.render('countryList', {countries:result})
    })
    .catch((error) => {
      res.send(error)
    })
})

// redirection to cities list
app.get('/cityList', (req, res) => {
  mysqlDAO.getCities()
    .then((result) => {
      res.render('cityList', {cities:result})
    })
    .catch((error) => {
      res.send(error)
    })
})

// redirection to the heads of state list
app.get('/stateHead', (req, res) => {
  mongoDAO.getHeadsOfState()
      .then((documents) => {
          res.render('stateHead', { headsOfState: documents })
      })
      .catch((error) => {
          res.send(error)
      }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})