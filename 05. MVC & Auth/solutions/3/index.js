const express = require('express')
const expressHandlebars = require('express-handlebars')

const models = require('./database')

const app = express()
app.engine('handlebars', expressHandlebars({ defaultLayout: 'master' }))
app.set('view engine', 'handlebars')
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.get('/', (req, res) => {
  models.Author.findAll({
    attributes: [ 'name' ],
    raw: true
  }).then(authors => {
    res.render('author', {
      authors: authors.map(author => author.name)
    })
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
      res.render('books', {
        author: author.name,
        books: books.map(book => book.title)
      })
    })
  })
})
