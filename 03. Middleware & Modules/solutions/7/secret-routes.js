const router = require('express').Router()

router.use(require('./auth-middleware'))

router.get('/', (req, res) => {
  res.json({ secret: true, lol: 'yes' })
})

router.get('/super', (req, res) => {
  res.json({ secret: true, super: true })
})

router.get('/super/not', (req, res) => {
  res.json({ secret: true, super: false })
})

module.exports = router
