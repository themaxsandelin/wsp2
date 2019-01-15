const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.listen(3000, () => {
  console.log('Server is up and running! 😎')
})

app.get('/', (req, res) => {
  let books = [
    {
      title: 'Harry Potter and the philosophers stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Harry Potter and the philosophers stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Ready Player One',
      author: 'Ernest Cline'
    },
    {
      title: 'Harry Potter 1337',
      author: 'Ernest Cline'
    }
  ]

  if (req.query.hasOwnProperty('author')) {
    books = books.filter(book => {
      if (book.author.indexOf(req.query.author) > -1) {
        return book
      }
    })
  }

  if (req.query.hasOwnProperty('title')) {
    books = books.filter(book => {
      if (book.title.indexOf(req.query.title) > -1) {
        return book
      }
    })
  }

  res.json(books)
})

app.post('/post', (req, res) => {
  res.json(req.body)
})

app.get('*', (req, res) => {
  res.status(404).send('Not found.')
})
