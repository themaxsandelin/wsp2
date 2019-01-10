const readline = require('readline')
const fs = require('fs')

let people = []
if (!fs.existsSync('people.json')) {
  fs.writeFileSync('people.json', JSON.stringify(people))
} else {
  const oldPeople = fs.readFileSync('people.json').toString()
  if (oldPeople !== '') {
    people = JSON.parse(oldPeople)
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question('Enter your name: ', (name) => {
  rl.question('Enter your age: ', (age) => {
    rl.question('Enter your height: ', (height) => {
      people.push({
        name: name,
        age: parseInt(age),
        height: parseInt(height)
      })
      fs.writeFileSync('people.json', JSON.stringify(people))
      
      rl.close()
    })
  })
})