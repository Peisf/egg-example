module.exports = (options, app) => {
    return async function (ctx, next) {
        
        // const headerStr = ctx.request.header.authorization;
        const headerStr = ctx.cookies.get('token')
        if (headerStr) {
            try {
                // 解码token，需传加密时的 secret
                const decode = ctx.app.jwt.verify(headerStr, options.secret);
                ctx.state.user = decode; // 信息存一下，这步很重要，业务里要用
                await next();
            } catch (error) {

                ctx.status = 401;
                // 翻译错误码
                let message = error.message;
                ctx.body = {
                    code: -1,
                    msg: message,
                };
                return;
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                code: -1,
                msg: '身份过期，重新登录',
            };
            return;
        }
    }
}