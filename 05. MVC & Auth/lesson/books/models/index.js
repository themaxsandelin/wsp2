const Sequelize = require('sequelize')
const fs = require('fs')

const connection = new Sequelize('books', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: () => {},
  operatorsAliases: false
})

const models = {}
// Read all files in the /models directory. Remove the index.js file. And remove the .js extension on the remaining files.
let files = fs.readdirSync(__dirname)
files = files.filter(file => file !== 'index.js').map(file => file.replace('.js', ''))
files.forEach(file => {
  models[file] = connection.import(file)
})

models.Book.belongsTo(models.Author, { foreignKey: 'authorId' })

// connection.authenticate().then(_ => {
//   console.log('Successfully connected to DB! :)')
// }).catch(error => {
//   console.log('Could not connect to DB. Reason: ', error)
// })

// connection.sync({ force: true }).then(_ => {
//   console.log('Database synchronized!')
// })

module.exports = models