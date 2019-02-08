function calc(num1, num2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num1 + num2)
    }, 1000)
  })
}

calc(1, 2).then(result => {
  console.log('1 + 2 = ' + result)
})
