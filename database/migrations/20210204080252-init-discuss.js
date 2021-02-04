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
		await queryInterface.createTable('discuss', {
			discussId: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
			topicId: {type: INTEGER(10)},// 帖子id
			userId: {type: STRING(255)},// 用户id
			replyName: {type: STRING(1000), allowNull: false},// 回复者姓名
			replyContent: {type: STRING(255), allowNull: true}, // 回复内容
			created_at: {type: DATE, defaultValue: NOW}// 回复创建时间
		});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('discuss');
  }
};
