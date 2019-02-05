const express = require('express')
const fs = require('fs')

const app = express()
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('books.json').toString())
  const authors = Object.keys(data) // Grab the keys (the authors by name) and return as the result
  res.json(authors)
})

app.get('/:author', (req, res) => {
  const data = JSON.parse(fs.readFileSync('books.json').toString())
  if (!data.hasOwnProperty(req.params.author)) return res.status(404).send('Not found.')

  res.json(data[req.params.author])
})
