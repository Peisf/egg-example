const Service = require('egg').Service;

class RegService extends Service {
  async index() {
    const { app } = this;
    const sql = `INSERT INTO auth_user()`
    return await app.mysql.query()
  }
}

module.exports = RegService;