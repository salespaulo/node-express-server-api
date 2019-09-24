/**
 * Módulo para exportar as APIs
 */
const logger = require('node-winston-logging')
const supportApi = require('./resources/api-support')

module.exports = server => {
    logger.debug('[Server API]: Route setup: /support')
    supportApi(server)

    return server
}
