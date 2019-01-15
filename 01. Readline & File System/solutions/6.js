const fs = require('fs')

let people = JSON.parse( fs.readFileSync('people.json').toString() )

let args = process.argv.slice(2, process.argv.length)
if (args.length) {
  const numberOfPeople = parseInt(args[0])
  people = people.slice(0, numberOfPeople)
  args.splice(0, 1)
  if (args.length) {
    people = people.filter((person) => {
      const keys = Object.keys(person)
      keys.forEach((key) => {
        if (args.indexOf(key) === -1) {
          delete person[key]
        }
      })
      return person
    })
  }
}

people.forEach((person) => {
  const keys = Object.keys(person)
  keys.forEach((key) => {
    console.log(key + ': ' + person[key])
  })
  console.log('')
})
