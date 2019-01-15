const readline = require('readline')

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface.question('Enter your name: ', (name) => {
  interface.question('Enter your age: ', (age) => {
    interface.question('Enter your height: ', (height) => {
      console.log('Hello, ' + name + '! You are ' + age + ' years old and ' + height + 'cm tall. 😎')
    })
  })
})
