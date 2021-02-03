const Controller = require('../../core/base_controller')

class LoginController extends Controller {
    async login() {
        const ctx = this.ctx;
        const { account, password } = ctx.request.body
        //验证用户是否存在并且密码是否正确
        const isValidUser = await this.service.login.login.validUser(account,password)
        if (isValidUser.status === 1) {
            const token = this.app.jwt.sign(
                { 
                account,
                password, 
            }, this.app.config.jwt.secret);
            this.success({
                status: 'ok',
                msg: '登录成功',
                type:'account',
                currentAuthority: "admin",
                token
            })
        }else{
            this.error({
                msg: '无效的用户名或密码'
            })
        }
    }
}

module.exports = LoginController