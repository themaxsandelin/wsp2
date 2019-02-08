const express = require('express')
const fs = require('fs')

const models = require('./database')

const app = express()
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.get('/', (req, res) => {
  models.Author.findAll({
    attributes: [ 'name' ]
  }).then(authors => {
    res.json(authors.map(author => author.name))
  })
})

app.get('/:author', (req, res) => {
  models.Author.findOne({
    where: { name: req.params.author }
  }).then(author => {
    if (!author) return res.status(404).send('Not found.')

    models.Book.findAll({
      where: { authorId: author.id },
      attributes: [ 'title' ]
    }).then(books => {
      res.json(books.map(book => book.title))
    })
  })
})
