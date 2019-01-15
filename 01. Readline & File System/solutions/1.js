const readline = require('readline')

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface.question('Enter your name: ', (answer) => {
  console.log('Hello, ' + answer + '!')
})
