const Service = require('egg').Service;
/**
 *
 *
 * @class UserService
 * @extends {Service}
 */
class UserService extends Service {

    async register(user) {
        const { ctx } = this
        user.userId = ctx.helper.uuid();
        const queryResult = await this.hasRegister(user.email)
        
        if (queryResult) {
            ctx.returnBody(200, "邮箱已被使用", {
                flag: false  
            })
            return 
        }

        const userAdd = await ctx.model.User.create(user)
        ctx.returnBody(200, "注册成功", {
            userId: userAdd.dataValues.userId,
            flag: true  
        })
        return userAdd.dataValues
    }
    /**
     *登录
     *
     * @param {*} user
     * @memberof UserService
     */
    async login(user) {
        const { app } = this;

        const existUser = await this.getUserByMail(user.email)
        //判断用户是否存在
        if (!existUser) {
            return null
        }
        const passhash = existUser.password;
        const equal = passhash === user.password
        //判断密码是否正确
        if (!equal) {
            return false
        }

        //验证通过
        const token = app.jwt.sign({userId: existUser.userId}, app.config.jwt.secret)
        return token
        
    }
    /**
     *注册- 查询用户是否已注册
     *
     * @param {*} email
     * @return {*} 
     * @memberof UserService
     */
    async hasRegister(email) {
        const user = await this.app.model.User.findOne({
            where: {email: email}
        })

        if (user && user.dataValues.userId) {
            return true
        }
        return false
    }

    async getUserByUserId(userId) {
        return this.ctx.model.User.findOne({
            where: { userId }
        })
    }
    /**
     *根据邮箱查找用户
     *
     * @param {*} email
     * @memberof UserService
     */
    async getUserByMail(email) {
        return this.ctx.model.User.findOne({
            where: { email }
        })
    }
    
}

module.exports = UserService 