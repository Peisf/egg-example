

module.exports = (option, app) => {
  return async function (ctx, next) {
    // 在授权配置白名单内，跳过授权校验
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(option)
      return
    }
    
    let token = ctx.cookies.get('token')
    if (token) {
      //解码token
      try {
        const decode = ctx.app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.user = decode; // 信息存一下，这步很重要，业务里要用
        await next();
      } catch (error) {
        ctx.returnBody(401, error.message)
        return;
      }
    } else {
      ctx.returnBody(401, "您未登录，请登录后再试")
      return;
    }
  }
};
