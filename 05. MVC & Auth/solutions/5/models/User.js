module.exports = (connection, DataTypes) => {
  return connection.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  })
}
