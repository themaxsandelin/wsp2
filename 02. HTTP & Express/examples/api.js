const request = require('request')

request('https://google.com', (error, response, body) => {
  console.log(body)
})
