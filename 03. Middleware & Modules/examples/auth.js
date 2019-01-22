module.exports = (req, res, next) => {
  if (!req.headers.hasOwnProperty('authorization')) {
    return res.status(401).send('Unauthorized.')
  }
  next()
}
