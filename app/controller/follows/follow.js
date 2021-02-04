const { Controller } = require('egg')

class FollowController extends Controller {

    //关注好友
    async follow() {
        const { ctx } = this
        const { userId, status} = ctx.request.body;

        let followedId = ctx.user.userId

        let followMsg = {
            userId, //被关注者id
            followedId, //关注者id
            status
        }

        await ctx.service.follows.follow.followUser(followMsg)
        ctx.returnBody(200, +status?"关注成功":"取消关注")
    }

    //获取未关注用户列表
    async notFollowList() {
        const { ctx } = this

        let userId = ctx.user.userId
        let friendList = await ctx.service.userInfo.user.getUserList(userId)
        ctx.returnBody(200, "获取成功", friendList)
    }
}

module.exports = FollowController