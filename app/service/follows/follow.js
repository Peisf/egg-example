const { Service } = require('egg')

class FollowService extends Service {

    /** 
     * 关注用户
     */
    async followUser(followUser) {
        const { ctx } = this
        const obj = await ctx.model.Follow.findOne({
            where: {
                userId: ctx.user.userId
            }
        })

        if (obj) {
            return await obj.update(followUser)
        }else{
            return await ctx.model.Follow.create(followUser)
        }

    }

    /**
     * 查询关注用户列表
     * @param {*} query 
     */
    async findFollow(query) {
        const { ctx } = this

        return await ctx.model.Follow.findAll({
            where: query
        })
    }

    async findFollowCounts(query) {
        const { ctx } = this
        return await ctx.model.Follow.findAndCountAll({
            where: query
        })
    }
}

module.exports = FollowService