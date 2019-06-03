
const { app, chai } = require('./utils/init')
const shutdown = require('./utils/shutdown')

describe('/support', () => {
    after(() => shutdown(app))

    it('/ping', done => {
        chai.request(app)
            .get('/support/ping')
            .end((err, res) => {
                if (err) throw new Error(err)
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('result').eql('pong')
                done()
            })
    })
    it('/echo/test', done => {
        chai.request(app)
            .get('/support/echo/test')
            .end((err, res) => {
                if (err) throw new Error(err)
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('result').eql('test')
                done()
            })
    })
})
