const express = require('express')
const bodyParser = require('body-parser')

const models = require('./database')

const app = express()
app.use(bodyParser.json())
app.listen(3000, () => {
  console.log('Server up and running!')
})

app.post('/register', (req, res) => {
  models.User.create({
    name: req.body.name,
    username: req.body.username
  }).then(user => {
    res.json({ success: true })
  }).catch(error => {
    res.status(500).send('Something went wrong.')
    console.log(error)
  })
})

app.get('/:username', (req, res) => {
  models.User.findOne({
    where: {
      username: req.params.username
    }
  }).then(user => {
    if (!user) return res.status(404).send('User not found.')

    user.getTweets({ attributes: [ 'content', ['createdAt', 'posted'] ] }).then(tweets => {
      res.json(tweets)
    })
  }).catch(error => {
    res.status(500).send('Something went wrong.')
    console.log(error)
  })
})

app.post('/:username', (req, res) => {
  models.User.findOne({
    where: {
      username: req.params.username
    }
  }).then(user => {
    if (!user) return res.status(404).send('User not found.')

    models.Tweet.create({
      content: req.body.content,
      userId: user.id
    }).then(tweet => {
      res.json({ success: true })
    }).catch(error => {
      res.status(500).send('Something went wrong.')
      console.log(error)
    })
  }).catch(error => {
    res.status(500).send('Something went wrong.')
    console.log(error)
  })
})
