module.exports = app => {
    const { router, controller } = app;
    const { login, user, follows, topics } = controller;
    const subRouter = router.namespace('/api/v1');

    //login
    subRouter.post('/login/register', login.index.register) //注册
    subRouter.post('/login', login.index.loginIn) //登录
    subRouter.get('/login/signout', login.index.signOut) //退出登录

    //user
    subRouter.get('/user/info', user.index.userInfo) // 获取用户信息
    subRouter.get('/user/personal', user.index.userPersonalInfo)
    subRouter.post('/user/update', user.index.updateUserInfo) //更新用户信息

    //follow
    subRouter.post('/follow/friend', follows.follow.follow) //关注好友
    subRouter.get('/follow/list', follows.follow.notFollowList) //获取未关注好友列表

    //topic
    subRouter.post('/topic/add',topics.topic.addTopic) //新增帖子
    subRouter.get('/topic/search', topics.topic.searchTopic) //搜索帖子
    subRouter.get('/topic/detail', topics.topic.topicDetail) //帖子详情
    subRouter.post('/topic/discuss/add', topics.topic.addDiscuss) //新增评论
    subRouter.put('/topic/like', topics.topic.putLikeTopic) //点赞
    subRouter.get('/topic/friend/list', topics.topic.friendsTopicList) //帖子列表

    // subRouter.post('/login/account', controller.conUser.login.login)
    // subRouter.post('/register', controller.conUser.register.register)
    // subRouter.get('/currentUser', middleware.jwtErr(app.jwt), controller.usec.index.current)
    // router.get('/', controller.home.index) 
    // router.get('/news', controller.news.list)
    // router.get('/user/:id', controller.user.info)
    // router.post('/api/login/account', controller.login.login)
    // router.get('/api/currentUser', app.jwt, controller.login.login)
}