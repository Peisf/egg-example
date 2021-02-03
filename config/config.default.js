const fs = require('fs');
const path = require('path');

module.exports = appInfo => {

    const config = exports = {};

    config.keys = appInfo.name + "_176021831751304_1748" 
    /**
   * The option of `bodyParser` middleware
   *
   * @member Config#bodyParser
   * @property {Boolean} enable - enable bodyParser or not, default is true
   * @property {String | RegExp | Function | Array} ignore - won't parse request body when url path hit ignore pattern, can not set `ignore` when `match` presented
   * @property {String | RegExp | Function | Array} match - will parse request body only when url path hit match pattern
   * @property {String} encoding - body's encoding type，default is utf8
   * @property {String} formLimit - limit of the urlencoded body. If the body ends up being larger than this limit, a 413 error code is returned. Default is 1mb
   * @property {String} jsonLimit - limit of the json body, default is 1mb
   * @property {String} textLimit - limit of the text body, default is 1mb
   * @property {Boolean} strict - when set to true, JSON parser will only accept arrays and objects. Default is true
   * @property {Number} queryString.arrayLimit - urlencoded body array's max length, default is 100
   * @property {Number} queryString.depth - urlencoded body object's max depth, default is 5
   * @property {Number} queryString.parameterLimit - urlencoded body maximum parameters, default is 1000
   */
    config.bodyParser = {
        enable: true,
        encoding: 'utf8',
        formLimit: '1mb',
        jsonLimit: '1mb',
        textLimit: '1mb',
        strict: true,
        // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
        queryString: {
            arrayLimit: 100,
            depth: 5,
            parameterLimit: 1000,
        },
        onerror(err) {
            err.message += ', check bodyParser config';
            throw err;
        },
    };
    /**
     * logger options
     * @member Config#logger
     * @property {String} dir - directory of log files
     * @property {String} encoding - log file encoding, defaults to utf8
     * @property {String} level - default log level, could be: DEBUG, INFO, WARN, ERROR or NONE, defaults to INFO in production
     * @property {String} consoleLevel - log level of stdout, defaults to INFO in local serverEnv, defaults to WARN in unittest, defaults to NONE elsewise
     * @property {Boolean} disableConsoleAfterReady - disable logger console after app ready. defaults to `false` on local and unittest env, others is `true`.
     * @property {Boolean} outputJSON - log as JSON or not, defaults to false
     * @property {Boolean} buffer - if enabled, flush logs to disk at a certain frequency to improve performance, defaults to true
     * @property {String} errorLogName - file name of errorLogger
     * @property {String} coreLogName - file name of coreLogger
     * @property {String} agentLogName - file name of agent worker log
     * @property {Object} coreLogger - custom config of coreLogger
     */
    config.logger = {
        dir: path.join(appInfo.root, 'logs', appInfo.name),
        encoding: 'utf8',
        env: appInfo.env,
        level: 'DEBUG',
        consoleLevel: 'DEBUG',
        disableConsoleAfterReady: appInfo.env !== 'local' && appInfo.env !== 'unittest',
        outputJSON: false,
        buffer: true,
        appLogName: `${appInfo.name}-web.log`,
        coreLogName: 'egg-web.log',
        agentLogName: 'egg-agent.log',
        errorLogName: 'common-error.log',
        coreLogger: {},
        allowDebugAtProd: false,
    };
    /**
     * egg-swagger-doc配置
     */

     config.swaggerdoc = {
        dirScannerL: './app/controller', //配置自动扫描的控制器路径
        //接口文档标题，描述或其它
        apiInfo: {
            title: 'MYAPI', //接口文档标题
            description: 'swagger-ui for MYAPI document', //接口文档描述
            version: '1.0.0' //接口文档版本
        },
        schemes: ['http', 'https'], //配置支持的协议
        consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
        produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
        securityDefinitions: {}, //配置接口安全授权方式
        enableSecurity: false, //是否启用授权 默认false
        //enableValidate: true, //是否启用参数校验
        routerMap: true, //是否启用自动生成路由
        enable: true, //默认启用
     };

    //添加view配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks'
        }
    }

    config.news = {
        pageSize: 5,
        serverUrl: 'https://hacker-news.firebaseio.com/v0'
    }
    //设置鉴权白名单
    config.authWhiteList = ['/api/v1/login', '/api/v1/login/register'];
    config.middleware = [
         'errorHandler', 'authorization'
    ]
    
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['*']  //[]中放 白名单 *代表所有
    };
    //注意，跨域请求时，前端请求打开withCredentials，否则依然无效
    config.cors = {
        // origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
        credentials: true , //允许跨域请求携带cookie
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'sf200672',
        database: 'learn',
        define: {
            freezeTableName: true, // Model 对应的表名将与model名相同。
            timestamps: false // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新（ 确实是太方便了，然而我们一般用不到 ....）。
        }
        // app: true,  //加载到应用程序
        // agent: false    //加载到代理中
    }


    config.jwt = {
        secret: 'sfpei',
        expiresIn: 60*60*24*7  //7天
    }
    config.static = {
        prefix: '/public',
        dir: path.join(appInfo.baseDir, 'app/public')
    }
    // cookie name config
    config.auth_cookie_name = 'token';
    return {
        ...config
    }
}
