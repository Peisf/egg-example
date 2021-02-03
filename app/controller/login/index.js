const { Controller } = require('egg')

class LoginController extends Controller {
    //注册
    async register() {
        const { ctx } = this;
        const { username, password, email } = ctx.request.body
        // if(!this.__errNotice()) return
        //验证用户是否存在并且密码是否正确
        await ctx.service.userInfo.user.register({username,password,email})
    }
    //登录
    async loginIn() {
        const { ctx } = this;
        const { password, email } = ctx.request.body

        const token = await ctx.service.userInfo.user.login({password, email})
        //set cookie
        if (token) {
            const opts = {
                path: '/',
                maxAge: 1000*60*60*24*30,
                httpOnly: false,
                domain: '127.0.0.1'
            }
            ctx.cookies.set(this.config.auth_cookie_name, token, opts)
            ctx.returnBody(200, "登录成功",{token})
        }else{
            ctx.returnBody(401, "用户名或密码错误")
        }
    }

    //登出
    async signOut() {
        const { ctx } = this;
        ctx.logout()
        ctx.cookies.set(this.config.auth_cookie_name, "")
        ctx.returnBody(200, "退出登录成功")
    }
    
    //参数规则校验
    __errNotice () {
        const { ctx } = this;
        const { mobile, password, code, username, email } = ctx.request.body
        let message; 
        if (!mobile || !email) {
            message = '手机号或者邮箱不能为空'
        } else if (!code) {
            message = '验证码不能为空'
        } else if (!username) {
            message = '用户名不能为空'
        } else if (!password) {
            message = '密码不能为空'
        }
        console.log('message',message);
        if (message) {
            ctx.returnBody(400, message);
            return false
        }
        return true
    }
}

module.exports = LoginController