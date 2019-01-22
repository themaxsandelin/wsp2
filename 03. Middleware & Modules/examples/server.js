const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./routes'))
app.listen(1337, () => {
  console.log('Server up and running.')
})

app.get('/hello', (req, res) => {
  res.send('Hello')
})
