/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('topic', {
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    topicTitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    topicImg: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'topic'
  });

  Model.associate = function() {

  }

  return Model;
};
