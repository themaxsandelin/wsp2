const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log(req.method + ' ' + req.originalUrl + ' ' + ip)
  next()
})
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
