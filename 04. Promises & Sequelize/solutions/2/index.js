const request = require('request')

function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    request('http://localhost:3000/' + author, (error, response, body) => {
      if (response.headers['content-type'].indexOf('application/json') === -1) {
        return reject('Author not found.')
      }

      resolve(JSON.parse(body))
    })
  })
}

const author = 'J. K. Rowling'
getBooksByAuthor(author).then(books => {
  console.log(author + ' has written the following books:')
  console.log(books)
}).catch((error) => {
  console.log('Could not fetch books by author. Reason: ', error)
})
