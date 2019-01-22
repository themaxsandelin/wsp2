const router = require('express').Router()
router.use('/', require('./auth'))

router.get('/', (req, res) => {
  res.json({
    secrets: 'All of the secrets. c:'
  })
})

router.post('/', (req, res) => {
  res.json(req.body)
})

module.exports = router
