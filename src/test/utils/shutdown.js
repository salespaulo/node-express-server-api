
module.exports = app => {
    app.instance.close()
    process.env.NODE_ENV = "development"
}