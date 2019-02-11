const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const models = require('./models')

const app = express()
app.use(bodyParser.json())
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.get('/', (req, res) => {
  models.Author.findAll({
    attributes: [ 'name' ]
  }).then(authors => {
    res.render('home', {
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

app.post('/register', (req, res) => {
  const salt = crypto.randomBytes(256).toString('hex')
  const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 256, 'sha512').toString('hex')

  models.User.create({
    name: req.body.name,
    username: req.body.username,
    password: password,
    salt: salt
  }).then(user => {
    res.json({ success: true })
  }).catch(error => {
    if (error.name === 'SequelizeUniqueConstraintError' && error.fields.hasOwnProperty('username')) {
      res.status(400).send('Username already taken.')
    } else {
      console.log(error)
      res.status(500).send('Something went wrong.')
    }
  })
})

app.delete('/user/:username', (req, res) => {
  models.User.findOne({
    where: { username: req.params.username }
  }).then(user => {
    if (!user) return res.status(404).send('User not found.')
    if (!req.headers.hasOwnProperty('authorization')) return res.status(401).send('Unauthorized.')
    if (req.headers.authorization.indexOf('Basic') === -1) return res.status(401).send('Unauthorized.')
    
    let credentials = req.headers.authorization.replace('Basic ', '')
    credentials = new Buffer(credentials, 'base64').toString('ascii').split(':')
    
    // Validate username
    if (credentials[0] !== user.username) return res.status(401).send('Unauthorized.')

    // Validate password
    if (crypto.pbkdf2Sync(credentials[1], user.salt, 10000, 256, 'sha512').toString('hex') !== user.password) {
      return res.status(401).send('Unauthorized.')
    }

    models.User.destroy({
      where: { id: user.id }
    }).then(_ => {
      res.json({ success: true })
    })

  }).catch(error => {
    console.log(error)
    res.status(500).send('Something went wrong.')
  })
})