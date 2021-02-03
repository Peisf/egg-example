/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('follow', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    followedId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'follow'
  });

  Model.associate = function() {

  }

  return Model;
};
