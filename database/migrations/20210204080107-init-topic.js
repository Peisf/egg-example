'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic', {
      topicId: {type: INTEGER, primaryKey: true, autoIncrement: true},//帖子id
      userId: {type: INTEGER},//用户id
      topicTitle: {type: STRING(255), allowNull: true}, // 帖子标题
      topicImg: {type: STRING(1000), allowNull: false},// 图片地址，
      address: {type: STRING(255), allowNull: true}, // 发表地址
      created_at: {type: DATE, defaultValue: NOW},// 创建时间
      updated_at: {type: DATE, defaultValue: NOW}// 更新时间
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('topic');
  }
};
