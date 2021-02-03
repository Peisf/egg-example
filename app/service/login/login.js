const Service = require('egg').Service;
const crypto = require('crypto')

class LoginService extends Service {
    async validUser(uname, password) {
        const data = await this.getUser(uname)
        // 0 用户不存在 1成功 2失败 3密码错误
        if (data.length === 0) {
            return {
                status: -1
            }
        }else{
            const pwd = crypto.createHash('md5').update(password).digest('hex');
            console.log('data=============', data);
            console.log('pwd=============', pwd);
            for (const item of data) {
                if (item.name === uname && item.password === pwd) {
                    return {
                        status: 1
                    }
                }
                return {
                    status: -1
                }
            }
            return {
                status: -1
            }
        }
    }
    async getUser(uname) {
        return await this.app.mysql.select('auth_user',{
            where: {
                name: uname
            }
        })
    }
}

module.exports = LoginService

/**事务操作
 * 
 */
// const conn = await app.mysql.beginTransaction(); // 初始化事务
 
// try {
//   await conn.insert(table, row1); // 第一步操作
//   await conn.update(table, row2); // 第二步操作
//   await conn.commit(); // 提交事务
// } catch (err) {
//   // error, rollback
//   await conn.rollback(); // 一定记得捕获异常后回滚事务！！
//   throw err;
// }