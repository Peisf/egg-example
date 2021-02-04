/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Discuss = app.model.define('discuss', {
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
    tableName: 'discuss'
  });

  Discuss.associate = function() {

  }

  return Discuss;
};
