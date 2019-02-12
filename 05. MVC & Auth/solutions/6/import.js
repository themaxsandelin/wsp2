const fs = require('fs')
const async = require('async')

const models = require('./database')

const data = JSON.parse(fs.readFileSync('books.json').toString())
const authors = Object.keys(data)

function insertBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    console.log('Importing books for author: ' + author.name)
    console.log('')
    const books = data[author.name]
    async.eachSeries(books, (bookTitle, callback) => {
      console.log('Importing the book: ' + bookTitle)
      models.Book.create({ title: bookTitle, authorId: author.id }).then(book => {
        console.log('Done!')
        console.log('')
        callback()
      }).catch(error => reject(error))
    }, () => {
      console.log('')
      console.log('----------')
      resolve()
    })
  })
}

async.eachSeries(authors, (authorName, callback) => {
  console.log('----------')
  console.log('')
  console.log('Importing author: ' + authorName)
  models.Author.create({ name: authorName }).then(author => {
    console.log('Done!')
    console.log('')
    insertBooksByAuthor(author).then(_ => {
      callback()
    })
  }).catch(error => {
    console.log('Could not insert author. Reason: ', error)
  })
}, () => {
  console.log('Authors and books successfully imported! :)')
})
