const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.listen(3000, () => {
  console.log('Server is running!')
})

app.get('/', (req, res) => {
  res.json({message: 'Hello, world!'})
})

app.get('/books', (req, res) => {
  const books = JSON.parse( fs.readFileSync('books.json').toString() )
  let bookString = ''
  books.forEach(book => {
    bookString += book.title + "<br>"
    bookString += book.author + "<br><br>"
  })
  res.send(bookString)
})

app.post('/books', (req, res) => {
  if (!req.body.hasOwnProperty('title') || req.body.title === '') {
    return res.status(400).send('Missing or invalid value for property: title')
  }
  if (!req.body.hasOwnProperty('author') || req.body.author === '') {
    return res.status(400).send('Missing or invalid value for property: author')
  }
  const books = JSON.parse( fs.readFileSync('books.json').toString() )
  books.push({
    title: req.body.title,
    author: req.body.author
  })
  fs.writeFileSync('books.json', JSON.stringify(books))
  res.json({ success: true })
})
