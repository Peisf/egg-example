/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Topic = app.model.define('topic', {
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'topic'
  });

  Topic.associate = function() {

  }

  return Topic;
};
