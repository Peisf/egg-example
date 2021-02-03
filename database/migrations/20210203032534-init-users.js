'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      userId: {type: INTEGER, primaryKey: true, autoIncrement: true},//用户id
      username: {type: STRING(255), allowNull: false}, // 用户名
      email: {type: STRING(255), allowNull: false},// email 地址
      password: {type: STRING(255), allowNull: false},// 密码  
      avatarUrl: STRING(256),// 头像
      mobile: STRING(32),// 手机号
      sex: {type: INTEGER, defaultValue: 0}, // 值为1时是男性，值为2时是女性，默认值为0时是未知
      created_at: DATE,// 创建时间
      updated_at: DATE// 更新时间
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
