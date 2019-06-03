
const { opts } = require('../../')

module.exports = app => {
    app.instance.close()
    process.env.PORT = opts.port
}