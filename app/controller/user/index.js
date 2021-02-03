const { Controller } = require('egg')

class UserController extends Controller {

    //获取用户信息
    async userInfo() {
        const { ctx } = this;
        let userId = ctx.query.userId || ctx.user.userId
        console.log(userId);
        let user = await ctx.service.userInfo.user.getUserByUserId(userId)
        let userInfo = {
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            abstract: user.abstract,
            account: user.email.replace(/@.*/, ''),
            mobile: user.mobile,
            sex: user.sex,
            userId: user.userId
        }
        ctx.returnBody(200, "获取信息成功", userInfo)
    }
}

module.exports = UserController