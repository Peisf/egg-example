//扩展
module.exports = {
    get user() {
        // let token = this.cookies.get('token')
        let token =  this.request.header.authorization.substring(7)
        let user = this.app.jwt.verify(token, this.app.config.jwt.secret);
        return user
    },
    /**
     *接口统一返回信息
     *
     * @param {*} status
     * @param {*} message
     * @param {*} [data=null]
     */
    returnBody(status, message, data = null) {
        this.status = status;
        this.body = {
            code: status,
            data,
            message,
            success: true
        }
    },

    toInt(str) {
        if (typeof str === 'number') return str;
        if (!str) return str;
        return parseInt(str, 10) || 0;
    }
}