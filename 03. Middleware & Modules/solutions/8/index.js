const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(req.method + ' ' + req.originalUrl + ' ' + ip)
  next()
})
app.use('/secret', require('./secret-routes'))
app.listen(3000, () => {
  console.log('Server up and running.')
})

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.post('/form', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.post('/register', (req, res) => {
  if (!req.body.hasOwnProperty('username') || !req.body.username) return res.status(400).send('Missing or invalid value for propety: username')
  if (!req.body.hasOwnProperty('password') || !req.body.password) return res.status(400).send('Missing or invalid value for propety: password')

  const credentials = JSON.parse(fs.readFileSync('credentials.json').toString())
  credentials.push({
    username: req.body.username,
    password: req.body.password
  })
  fs.writeFileSync('credentials.json', JSON.stringify(credentials))

  res.json({ success: true })
})
