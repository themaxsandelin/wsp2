const Sequelize = require('sequelize')
const database = new Sequelize('twitter', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: () => {}, // Hide log output from console.
  operatorsAliases: false // Deprecated feature. Disable to hide warning.
})

// database.authenticate().then(_ => {
//   console.log('Connection successful!')
// }).catch(error => {
//   console.log('Could not connect to database.', error)
// })

const models = {
  User: database.define('user', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),
  Tweet: database.define('tweet', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}

models.Tweet.belongsTo(models.User, { foreignKey: 'userId' })
models.User.hasMany(models.Tweet, { as: 'tweets' })

// database.sync({ force: true }).then(_ => {
//   console.log('Database synchronized!')
// })

module.exports = models
