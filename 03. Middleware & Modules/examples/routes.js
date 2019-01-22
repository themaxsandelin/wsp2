const router = require('express').Router()

router.use('/secret', require('./secret-routes'))

router.get('/', (req, res) => {
  res.send('Hello, world!')
})

router.post('/form', (req, res) => {
  res.send('Hello, ' + req.body.name + '!')
})

module.exports = router
