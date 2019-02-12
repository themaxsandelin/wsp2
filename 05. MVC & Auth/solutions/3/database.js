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
  Author: connection.define('author', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),
  Book: connection.define('book', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}

models.Book.belongsTo(models.Author, { foreignKey: 'authorId' })

// connection.sync({ force: true }).then(_ => {
//   console.log('Database synchronized!')
// })

module.exports = models
