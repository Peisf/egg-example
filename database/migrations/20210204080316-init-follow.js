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
		await queryInterface.createTable('follow', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
			userId: {type: STRING(255)},// 用户id
			followedId: {type: STRING(255)},// 关注者id
			status: {type: INTEGER(1), allowNull: false},// 关注状态 0:取消关注，1:已关注
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
    await queryInterface.dropTable('follow');
  }
};
