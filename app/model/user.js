/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue: 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg'
    },
    mobile: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    prefix: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: '0'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    },
    abstract: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  User.associate = function() {

  }

  return User;
};
