const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const crypto = require('crypto')

function generateRandomId() {
  const str = crypto.randomBytes(16).toString('hex')
  return str
}

const app = express()
app.use(bodyParser.json())
app.listen(3000, () => {
  console.log('Server is running!')
})

app.get('/', (req, res) => {
  res.json({message: 'Hello, world!'})
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
    author: req.body.author,
    id: generateRandomId()
  })
  fs.writeFileSync('books.json', JSON.stringify(books))
  res.json({ success: true })
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

app.get('/books/:bookId', (req, res) => {
  const id = req.params.bookId
  let books = JSON.parse( fs.readFileSync('books.json').toString() )
  books = books.filter(book => book.id === id)
  if (!books.length) return res.status(404).send('Invalid book ID.')

  res.json(books[0])
})
