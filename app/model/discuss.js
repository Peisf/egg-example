/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('discuss', {
    discussId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    replyName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    replyContent: {
      type: DataTypes.STRING(255),
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
    tableName: 'discuss'
  });

  Model.associate = function() {

  }

  return Model;
};
