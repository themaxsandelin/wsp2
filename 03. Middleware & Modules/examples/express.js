const express = require('express')

const app = express()
app.listen(1337, () => {
  console.log('Server up and running.')
})

app.get('/', (req, res) => {
  res.send('Hello, world!')
})
