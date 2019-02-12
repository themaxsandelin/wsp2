const Sequelize = require('sequelize')
const connection = new Sequelize('books', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: () => {},
  operatorsAliases: false
})

// connection.authenticate().then(_ => {
//   console.log('Successfully connected to DB! :)')
// }).catch(error => {
//   console.log('Could not connect to DB. Reason: ', error)
// })

const models = {
  Author: connection.import('./models/Author'),
  Book: connection.import('./models/Book'),
  User: connection.import('./models/User')
}

models.Book.belongsTo(models.Author, { foreignKey: 'authorId' })

// connection.sync({ force: true }).then(_ => {
//   console.log('Database synchronized!')
// })

module.exports = models
