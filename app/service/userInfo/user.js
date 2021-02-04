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

    /**
     *根据userId 查找用户
     *
     * @param {*} userId
     * @return {*} 
     * @memberof UserService
     */
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

    /**
     *更新用户信息
     *
     * @param {*} query
     * @param {*} updateValue
     * @return {*} 
     * @memberof UserService
     */
    async updateUserInfo(query, updateValue) {
        return this.ctx.model.User.update(updateValue,{
            where: query
        })
    }

    async getUserList(userId) {
        const { app, ctx } = this
        const Op = app.Sequelize.Op

        //查询已关注用户
        let followList = await ctx.model.Follow.findAll({
            attributes: ['userId'],
            where: {
                followedId: userId,
                status: 1
            }
        }) 

        followList = followList.map(item => {
            return item.userId
        })

        return ctx.model.User.findAll({
            attributes: ['userId','username','email','avatarUrl','abstract'],
            where: {
                userId: {
                    [Op.ne]: userId,
                    [Op.notIn]: followList
                }
            }
        })
    }
    
}

module.exports = UserService 