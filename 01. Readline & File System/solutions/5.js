const fs = require('fs')

let people = JSON.parse( fs.readFileSync('people.json').toString() )

const args = process.argv.slice(2, process.argv.length)
if (args.length) {
  const numberOfPeople = parseInt(args[0])
  people = people.slice(0, numberOfPeople)
}

people.forEach((person) => {
  console.log('Name: ' + person.name)
  console.log('Age: ' + person.age)
  console.log('Height: ' + person.height)
  console.log('')
})
