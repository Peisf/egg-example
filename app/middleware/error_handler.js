
module.exports = (option, app) => {

  /**
   * 异常处理中间件
   * @author sf
   *
   * @param cxt
   * @param next
   *
   * @modified by sf on 15:01 2021/02/03
   * @return {Promise<void>}
   */

  return async function (ctx, next) {
    try {
        await next(option);
    } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        app.emit('error', err);
        const status = err.status || 500;

        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error_msg = status === 500 && app.config.env === 'prod'
            ? 'Internal Server Error'
            : err.message;
            
        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = { 
            code: status,
            data: null,
            message: error_msg,
            success: false
        };
        ctx.status = status;
    }
  };
};