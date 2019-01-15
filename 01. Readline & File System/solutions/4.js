const fs = require('fs')

const people = JSON.parse( fs.readFileSync('people.json').toString() )
people.forEach((person) => {
  console.log('Name: ' + person.name)
  console.log('Age: ' + person.age)
  console.log('Height: ' + person.height)
  console.log('')
})
