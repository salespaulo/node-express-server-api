/**
 * Módulo que exporta a biblioteca
 */
const express = require('express')
const config = require('config')

const api = require('./api')
const logger = require('./log')
const { server } = require('./server')
const { inspect } = require('./utils')

/** NODE_ENV - Default */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

/** Catch Uncaught Exception */
process.on('uncaughtException', (err) => { 
    logger.error(':: UNCAUGHT EXCEPTION ::');
    logger.error(`[Inside 'uncaughtException' event]: stack: ${inspect(err.stack)} || ${err.message}`);
    process.exit(1)
})

/** Init Server Method */
const init = () => {
    logger.debug(`Server Init Config NODE_ENV: ${ process.env.NODE_ENV }`)
    logger.debug(`Server Init Config Logger: ${ inspect(config.logger) }`)
    logger.debug(`Server Init Config Server: ${ inspect(config.server) }`)
    
    return express()
}

/** Exports Server API  */
module.exports = server(init()).map(api)
