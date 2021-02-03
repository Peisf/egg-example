const Controller = require('../../core/base_controller');

class RegController extends Controller {
    async register() {
        const { ctx } = this;
        console.log(ctx.request,body);
    }
}

module.exports = RegController