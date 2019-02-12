const Sequelize = require('sequelize')
const fs = require('fs')
const connection = new Sequelize('books', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: () => {},
  operatorsAliases: false
})

const models = {}
let files = fs.readdirSync(__dirname)
files.filter(file => file !== 'index.js').map(file => {
  file = file.replace('.js', '')
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
