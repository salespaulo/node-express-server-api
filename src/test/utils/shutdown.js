
const { DEFAULT_PORT } = require('../../server')

module.exports = app => {
    app.instance.close()
    process.env.PORT = DEFAULT_PORT
    process.env.NODE_ENV = "development"
}