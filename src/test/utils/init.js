const server = require('../../')

const app = server({
    name: 'node-express-server-api',
    port: '3999',
    version: '1.0.0',
    running: true,
    headers: {
        test: 'valor 1'
    }
}).get()
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

module.exports = {
    chai,
    chaiHttp,
    should: chai.should(),
    app
}
