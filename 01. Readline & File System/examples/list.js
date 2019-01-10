const fs = require('fs')

if (!fs.existsSync('people.json')) {
  console.log('There are no people. 😔')
  process.exit()
}

let people = fs.readFileSync('people.json').toString()
if (people === '') {
  console.log('There are no people. 😔')
  process.exit()
}
people = JSON.parse(people)

if (!people.length) {
  console.log('There are no people. 😔')
  process.exit()
}

let args = process.argv.slice(2, process.argv.length)
if (args.length) {
  const numberOfPeople = parseInt(args[0])
  args.shift()

  people = people.slice(0, numberOfPeople)

  if (args.length) {
    people = people.filter(person => {
      Object.keys(person).forEach(key => {
        if (args.indexOf(key) === -1) {
          delete person[key]
        }
      })
      return person
    })
  } 
}

people.forEach(person => {
  Object.keys(person).forEach(key => {
    console.log(key + ': ' + person[key])
  })
  console.log('')
})