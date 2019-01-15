const readline = require('readline')
const fs = require('fs')

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface.question('Enter your name: ', (name) => {
  interface.question('Enter your age: ', (age) => {
    interface.question('Enter your height: ', (height) => {
      const people = JSON.parse(fs.readFileSync('people.json').toString())
      people.push({
        name: name,
        age: age,
        height: height
      })
      fs.writeFileSync('people.json', JSON.stringify(people))
      interface.close()
    })
  })
})
