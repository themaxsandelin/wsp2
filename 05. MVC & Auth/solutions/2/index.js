const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})
