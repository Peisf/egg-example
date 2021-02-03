const moment = require('moment')
const uuid = require('uuid')

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow()

exports.uuid = () => uuid.v4().replace(/-/g,'')