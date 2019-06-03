/**
 * Módulo para exportar as APIs
 */
const logger = require('../log')
const supportApi = require('./resources/api-support')

module.exports = server => {

    logger.info('[Server API]: Route setup: /support')
    supportApi(server)

    return server
}