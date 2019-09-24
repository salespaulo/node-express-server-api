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
const logger = require('node-winston-logging')
const { merge, inspect, option } = require('node-config-utils/objects')

const cors = require('cors')
const error = require('errorhandler')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const _unknown = {
    name: 'unknown',
    port: 3100,
    version: '1.0.0'
}

const opts = config.has('server') ? config.get('server') : _unknown

const setHeaders = config => (_req, res, next) => {
    if (config) {
        if (config.headers) {
            res.set(config.headers)
        }
        res.setHeader('node-server-api-version', config.version || opts.version)
    } else if (opts.headers) {
        if (opts.headers) {
            res.set(opts.headers)
        }
        res.setHeader('node-server-api-version', opts.version)
    }

    next()
}

const getPort = config => {
    if (config && config.port) {
        return config.port
    }

    return opts.port
}

const _env = (config = false) => {
    const user = process.env.USER
    const port = process.env.PORT || getPort(config)
    const environment = process.env.NODE_ENV || 'develpment'

    return {
        ip: ip.address(),
        user,
        port,
        environment
    }
}

const _info = (config = false) => {
    if (config) {
        return {
            name: config.name,
            version: config.version,
            running: config.running
        }
    }

    return {
        name: opts.name,
        version: opts.version,
        running: opts.running
    }
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

const start = (server, config) => {
    server = merge(server, { env: _env(config) })
    server = merge(server, { info: _info(config) })
    server = listen(server)

    logger.silly(`Server: ${inspect(server)}`)
    return server
}

const server = (httpServer, config = false) =>
    option(httpServer)
        .map(server => start(server, config))
        .map(server => server.use(error()))
        .map(server => server.use(cors()))
        .map(server => server.use(helmet()))
        .map(server => server.use(cookieParser()))
        .map(server => server.use(logger.morgan()))
        .map(server => server.use(bodyParser.json()))
        .map(server => server.use(setHeaders(config)))
        .map(server =>
            server.use(
                bodyParser.urlencoded({
                    extended: true
                })
            )
        )

module.exports = server
