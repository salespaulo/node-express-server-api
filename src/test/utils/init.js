
process.env.PORT = '3999'

const server = require('../../')

const app = server.get()
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

module.exports = { 
    chai,
    chaiHttp, 
    should: chai.should(),
    app
}