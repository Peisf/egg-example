module.exports = app => {
    const { router, controller } = app;
    const { login, user } = controller;
    const subRouter = router.namespace('/api/v1');

    //login
    subRouter.post('/login/register', login.index.register) //注册
    subRouter.post('/login', login.index.loginIn) //登录
    subRouter.get('/login/signout', login.index.signOut) //退出登录

    //user
    subRouter.get('/user/info', user.index.userInfo) // 获取用户信息

    // subRouter.post('/login/account', controller.conUser.login.login)
    // subRouter.post('/register', controller.conUser.register.register)
    // subRouter.get('/currentUser', middleware.jwtErr(app.jwt), controller.usec.index.current)
    // router.get('/', controller.home.index) 
    // router.get('/news', controller.news.list)
    // router.get('/user/:id', controller.user.info)
    // router.post('/api/login/account', controller.login.login)
    // router.get('/api/currentUser', app.jwt, controller.login.login)
}