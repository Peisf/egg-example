/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Follow = app.model.define('follow', {
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
    followedId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
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
  }, {
    tableName: 'follow'
  });

  Follow.associate = function() {

  }

  return Follow;
};
