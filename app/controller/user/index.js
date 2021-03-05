const { Controller } = require('egg')

class UserController extends Controller {
    //获取所有用户列表
    async userList() {
        const { ctx } = this;
        ctx.logger.info(ctx.request.body)
        const query = { limit: ctx.toInt(ctx.query.pageSize), offset: ctx.toInt(ctx.query.current - 1)};
        const username = ctx.query.username || ''
        const email = ctx.query.email || ''
        let userAll = await ctx.service.userInfo.user.getUserAll(query, username, email)
        ctx.returnBody(200,'获取用户列表成功', userAll)
    }
    //获取用户信息
    async userInfo() {
        const { ctx } = this;
        this.ctx.logger.info(ctx.request.body)
        let userId = ctx.query.userId || ctx.user.userId
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

    //更新用户信息
    async updateUserInfo() {
        const { ctx } = this;

        let userId = ctx.user.userId
        
        //判断邮箱是否被使用
        let contentBody = ctx.request.body;
        ctx.validate({email: 'email', password: {type: 'password', min: 6 }, newPassword: {type: 'password', min: 6 }}, contentBody)
        if (contentBody.email) {
            let result = await ctx.service.userInfo.user.getUserByMail(contentBody.email)
            if (result && result.userId !== userId) {
                ctx.returnBody(400, "该邮箱已被其他账户使用")
                return
            }
        }

        //校验密码
        let result = await ctx.service.userInfo.user.getUserByUserId(userId)
        if (contentBody.password && result && result.password !== contentBody.password) {
            ctx.returnBody(400, "旧密码不正确")
            return
        }else if (contentBody.password === contentBody.newPassword) {
            ctx.returnBody(400, "新旧密码不能一致")
            return
        }else if (contentBody.password) {
            contentBody.password = contentBody.newPassword
        }

        //获取并填充数据
        await ctx.service.userInfo.user.updateUserInfo({userId}, contentBody)

        //已更改密码，让用户重新登录
        if (contentBody.password) {
            ctx.logout()
            ctx.cookies.set(this.config.auth_cookie_name, "")
            ctx.returnBody(200, "密码更新成功，请重新登录")
        }else{
            ctx.returnBody(200, "更新成功")
        }
    }

    //获取用户关注、粉丝、帖子数量
    async userPersonalInfo() {
        const { ctx } = this

        let userId = ctx.query.userId || ctx.user.userId

        //用户帖子
        let topics = await ctx.service.topics.topic.queryTopicCounts({
            userId
        })
        
        let topicList = []
        for (const topic of topics.rows) {
            let item = await ctx.service.topics.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        //用户粉丝
        let fansCounts = await ctx.service.follows.follow.findFollowCounts({
            userId,
            status: 1
        })

        //用户关注数
        let followCounts = await ctx.service.follows.follow.findFollowCounts({
            followedId: userId,
            status: 1
        })

        //非本人查询是否关注了登陆人
        let isSelf = !ctx.query.userId || ctx.query.userId === ctx.user.userId
        let followList = [];
        if (!isSelf) {
            followList = await ctx.model.Follow.findAll({
                attributes: ['userId'],
                where: {
                    followedId: ctx.user.userId,
                    userId: ctx.query.userId,
                    status: 1
                }
            })
        }

        ctx.returnBody(200, "获取成功", {
            topic: {
                counts: topics.count,
                topicList
            },
            followCounts: followCounts.count,
            fansCounts: fansCounts.count,
            isSelf,
            hasFollow: followList.length > 0
        })
    }
}

module.exports = UserController