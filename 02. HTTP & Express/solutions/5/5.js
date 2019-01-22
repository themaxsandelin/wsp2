const express = require('express')
const fs = require('fs')

const app = express()
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
