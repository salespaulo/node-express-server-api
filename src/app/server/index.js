/**
 * SERVER - index.ts
 *
 * Exporta uma função que cria um servidor
 * configurado a partir de uma instancia de
 * {Http} da API Nodejs.
 */
const ip = require('ip')
const config = require('config')
const moment = require('moment')

const cors = require('cors')
const error = require('errorhandler')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const logger = require('../log')
const { merge, inspect, option } = require('../utils')

const _unknown = {
    name: 'unknown'
}

const DEFAULT_PORT = '4000'
const opts = config.has('server') ? config.get('server') : _unknown

process.env.PORT =
    process.env.PORT == undefined
        ? opts.port == undefined
            ? DEFAULT_PORT
            : opts.port
        : process.env.PORT

const _env = () => {
    return {
        ip: ip.address(),
        user: process.env.USER,
        port: process.env.PORT,
        profile: process.env.NODE_ENV
    }
}

const setHeaders = () => (_req, res, next) => {
    if (opts.headers) {
        res.set(opts.headers)
    }

    res.setHeader('node-server-api-version', opts.version)
    next()
}

const listen = server => {
    const instance = server.listen(process.env.PORT, () => {
        logger.debug(`[Server Env]: ${inspect(server.env)}`)
        logger.debug(`[Server Info]: ${inspect(server.info)}`)
        logger.info(
            `[Server Listen]: Address: ${ip.address()}:${
                process.env.PORT
            } startup: ${moment().toISOString()}`
        )
    })

    return merge(server, { instance: instance })
}

const mixinEnv = server => merge(server, { env: _env() })

const mixinInfo = server =>
    merge(server, {
        info: {
            name: opts.name,
            version: opts.version,
            running: opts.running
        }
    })

const start = server => {
    server = mixinEnv(mixinInfo(listen(server)))

    logger.silly(`Server: ${inspect(server)}`)
    return server
}

const server = httpServer =>
    option(httpServer)
        .map(server => start(server))
        .map(server => server.use(error()))
        .map(server => server.use(cors()))
        .map(server => server.use(helmet()))
        .map(server => server.use(cookieParser()))
        .map(server => server.use(logger.morgan()))
        .map(server => server.use(bodyParser.json()))
        .map(server => server.use(setHeaders()))
        .map(server =>
            server.use(
                bodyParser.urlencoded({
                    extended: true
                })
            )
        )

module.exports = {
    opts,
    server
}
