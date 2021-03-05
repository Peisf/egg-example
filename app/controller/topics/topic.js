const { Controller } = require('egg')
/**
 *帖子
 *
 * @class TopicController
 * @extends {Controller}
 */
class TopicController extends Controller {

    /**
     *新增帖子
     *
     * @memberof TopicController
     */
    async addTopic() {
        const { ctx } = this
        const { topicImg, topicTitle } = ctx.request.body

        let userId = ctx.user.userId
        let newTopic = { 
            topicImg: JSON.stringify(topicImg),
            topicTitle: topicTitle,
            userId
        }

        await ctx.service.topics.topic.insertTopic(newTopic)
        ctx.returnBody(200, "发帖成功")
    }

    /**
     *新增评论
     *
     * @memberof TopicController
     */
    async addDiscuss() {
        const { ctx } = this
        const { topicId, replyContent } = ctx.request.body

        let userId = ctx.user.userId
        //获取用户信息
        let user = await ctx.service.userInfo.user.getUserByUserId(userId)

        //评论
        let newDiscuss = {
            topicId: topicId,
            replyContent,
            replyName: user.username,
            userId
        }

        let discuss = await ctx.service.topics.topic.insertDiscuss(newDiscuss)

        discuss && ctx.returnBody(200, "评论成功")
        !discuss && ctx.returnBody(400, "网络异常请稍后重试")
    }

    /**
     * 获取帖子详情
     */
    async topicDetail() {
        const { ctx } = this
        const { topicId } = ctx.request.body;

        let topicDetail = await ctx.service.topics.topic.topicDetailHanderl(topicId)
        ctx.returnBody(200, "成功",topicDetail)
    }

    //获取帖子列表
    async friendsTopicList() {
        const { ctx } = this
        this.ctx.logger.info(ctx.request.body)
        let userId = ctx.user.userId
        //查询帖子详情
        let follower = await ctx.service.follows.follow.findFollow({
            followedId: userId,
            status: 1
        })

        //处理需要查询用户帖子的userId
        let followList = follower.map( item => {
            return item.userId
        })
        followList.push(userId)

        //获取每个帖子详情、评论、发帖人信息
        const Op = this.app.Sequelize.Op
        let topics = await ctx.service.topics.topic.queryTopicList({
            userid: {
                [Op.in]: followList
            }
        })

        let topicList = []

        //处理所有帖子
        for (let topic of topics) {
            let item = await ctx.service.topics.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }

        topicList && ctx.returnBody(200, "成功", topicList)
    }

    /**
     * 点赞
     */
    async putLikeTopic() {
        const { ctx } = this
        const { topicId, status } = ctx.request.body

        let userId = ctx.user.userId

        let topicStatus = { 
            topicId,
            userId,
            status
        }

        //查询条件
        let query = {
            topicId,
            userId
        }

        //未曾创建进行创建，否则更新
        await ctx.service.topics.topic.putTopicLike(query, topicStatus)

        ctx.returnBody(200, "更新成功", {status})

    }

    /**
     * 搜索帖子
     */
    async searchTopic() {
        const { ctx } = this
        const { search } =  ctx.request.body

        const Op = this.app.Sequelize.Op
        let topics = await ctx.service.topics.topic.queryTopicList({
            topicTitle: {
                [Op.regexp]: search
            }
        })

        let topicList = []

        for (let topic of topics) {
            let item = await ctx.service.topics.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }
        ctx.returnBody(200, "成功", topicList)
    }

    async queryTopic() {
        const { ctx } = this
        let topicCounts = await ctx.service.topics.topic.queryTopicCounts({
            userId: ctx.user.userId
        })
        return topicCounts
    }
}

module.exports = TopicController