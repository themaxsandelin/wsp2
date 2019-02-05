module.exports = (req, res, next) => {
  if (!req.headers.hasOwnProperty('authorization')) return res.status(401).send('Unauthorized')
  if (req.headers.authorization.indexOf('Basic') === -1) return res.status(401).send('Unauthorized')

  let credentials = req.headers.authorization.replace('Basic ', '')
  credentials = new Buffer(credentials, 'base64')
  credentials = credentials.toString('ascii')
  credentials = credentials.split(':')
  credentials = {
    username: credentials[0],
    password: credentials[1]
  }
  if (credentials.username !== 'admin' || credentials.password !== 'password') {
    return res.status(401).send('Unauthorized')
  }

  next()
}
