//扩展
module.exports = {
    get user() {
        let token = this.cookies.get('token')
        let user = this.app.jwt.verify(token, this.app.config.jwt.secret);
        return user
    },
    returnBody(status, message, data = null) {
        this.status = status;
        this.body = {
            code: status,
            data,
            message,
            success: true
        }
    }
}