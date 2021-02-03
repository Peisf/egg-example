/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('topic_like', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
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
    tableName: 'topic_like'
  });

  Model.associate = function() {

  }

  return Model;
};
