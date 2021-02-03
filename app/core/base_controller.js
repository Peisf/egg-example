const Controller = require("egg").Controller

class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    }

    success(data) {
        this.ctx.body = {
            ...data
        }
    }

    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg)
    }

}

module.exports = BaseController