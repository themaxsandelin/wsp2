const request = require('request')

function getApiData(endpoint) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://data.gradee.io'
    request(baseUrl + endpoint, (error, response, body) => {
      if (error) return reject(error)

      const isJSON = response.headers['content-type'].indexOf('application/json') > -1
      if (!isJSON) return reject(new Error('Endpoint: ' + endpoint + '. Message: "' + body + '"'))

      resolve(JSON.parse(body))
    })
  })
}

Promise.all([
  getApiData('/schools'),
  getApiData('/schools/ntijohanneberg'),
]).then(results => {
  console.log(results)
}).catch(error => {
  console.log(error)
})
