const path = require('path');

module.exports = appInfo => {

    const config= exports= {}
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

    config.opts = {
        path: '/',
        maxAge: 1000*60*60*24*30,
        httpOnly: false,
        domain: '127.0.0.1'
    }
    return {
        ...config
    }
}