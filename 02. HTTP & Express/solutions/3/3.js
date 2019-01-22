const request = require('request')

request('https://data.gradee.io/schools', (error, response, body) => {
  const schools = JSON.parse(body)
  schools.forEach(school => {
    console.log(school.name)
    console.log('https://data.gradee.io/schools/' + school.slug)
    console.log('')
  })
})
