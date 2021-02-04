const { Service } = require('egg')

class TopicService extends Service {

    //新增帖子
    async insertTopic(topicParams) {
        const { ctx } = this;
        return await ctx.model.Topic.create(topicParams)
    }

    //新增评论
    async insertDiscuss(discussParams) {
        const { ctx } = this
        return await ctx.model.Discuss.create(discussParams)
    }

    //查询帖子详情
    async queryTopicDetail(query) {
        const { ctx } = this;
        return await ctx.model.Topic.findOne({
            where: query
        })
    }

    /**
     *查询帖子列表
     *
     * @param {*} query
     * @return {*} 
     * @memberof TopicService
     */
    async queryTopicList(query) {
        const { ctx } = this
        return await ctx.model.Topic.findAll({
            where: query,
            order: [['created_at', 'DESC']]
        })
    }

    /**
     *帖子详情
     *
     * @param {*} topicId
     * @memberof TopicService
     */
    async topicDetailHanderl(topicId) {
        const { ctx } = this

        //获取帖子详情
        let topic = await ctx.service.topics.topic.queryTopicDetail({
            topicId: +topicId
        })

        let userId = topic.userId
        //获取帖子的账号信息
        let user = await ctx.service.userInfo.user.getUserByUserId(userId)

        //查询帖子评论
        let discuss = await ctx.service.topics.topic.queryDiscuss({
            topicId: +topicId
        })

        //查询用户是否已点赞
        let topicLike = await ctx.service.topics.topic.queryTopicLike({
            topicId: +topicId,
            userId: ctx.user.userId,
            status: 1
        })
        //查询点赞数量
        let topicLikeCounts = await ctx.service.topics.topic.queryTopicLikeCounts({
            topicId: +topicId,
            status: 1
        })


        //对数据进行处理
        let discussList = discuss.map(item => {
            return {
                replyName: item.replyName,
                replyContent: item.replyContent,
                userId: item.userId
            }
        })

        //帖子详情数据处理
        const topicDetail = { 
            userInfo: {
                username: user.username,
                avatarUrl: user.avatarUrl,
                userId: user.userId
            },
            topic: {
                topicImgList: JSON.parse(topic.topicImg),
                create_at: topic.created_at,
                topicId,
                topicLike: !!topicLike,
                topicLikeCounts: topicLikeCounts.count,
            },
            discuss: discussList
        }

        return topicDetail || {}
    }

    /**
     *查找是否点赞
     *
     * @param {*} query
     * @return {*} 
     * @memberof TopicService
     */
    async queryTopicLike(query) {
        const { ctx } = this
        return await ctx.model.TopicLike.findOne({
            where: query
        })
    }

    /**
     *创建或更新点赞状态
     *
     * @param {*} query
     * @param {*} topicStatus
     * @memberof TopicService
     */
    async putTopicLike(query, topicStatus) {
        const { ctx } = this
        let result = await this.queryTopicLike(query)
        if (!result) {
            return await ctx.model.TopicLike.create(topicStatus)
        } else {
            return await ctx.model.TopicLike.update(topicStatus,{
                where : query
            })
        }
    }

    /**
     *查询帖子点赞数量
     *
     * @param {*} query
     * @return {*} 
     * @memberof TopicService
     */
    async queryTopicLikeCounts(query) {
        const { ctx } = this
        return await ctx.model.TopicLike.findAndCountAll({
            where: query
        })
    }

    /**
     *查询帖子数量
     *
     * @param {*} query
     * @return {*} 
     * @memberof TopicService
     */
    async queryTopicCounts(query) {
        const { ctx } = this
        return await ctx.model.Topic.findAndCountAll({
            where: query,
            order: [['created_at', 'DESC']]
        })
    }

    /**
     *查询评论详情
     *
     * @param {*} query
     * @return {*} 
     * @memberof TopicService
     */
    async queryDiscuss(query) {
        const { ctx } = this
        return await ctx.model.Discuss.findAll({
            where: query
        })
    }
}

module.exports = TopicService