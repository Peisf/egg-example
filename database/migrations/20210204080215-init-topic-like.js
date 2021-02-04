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
		await queryInterface.createTable('topic-like', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},// 帖子id
			userId: {type: STRING(255)},// 用户id
			status: {type: INTEGER(1)}, // 帖子状态1: 点赞 0: 取消点赞
			created_at: {type: DATE, defaultValue: NOW},// 回复创建时间
			update_at: {type: DATE, defaultValue: NOW}// 回复创建时间
		});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('topic-like');
  }
};
