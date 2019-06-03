/**
 * Logging module
 */
const winston = require('winston')
const morgan = require('morgan')
const config = require('config')

const { IS_ENV_PROD, merge } = require('../utils')

const FILE_LEVEL = config.logger.file.level
const FILE_NAME = config.logger.file.path
const CONSOLE_LEVEL = config.logger.console.level

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || null
const ELASTICSEARCH_INDEXPREFIX = config.logger.elasticsearch.indexPrefix || 'node-server-api'

const elasticsearch = () => {
    const Elasticsearch = require('winston-elasticsearch')

    return new Elasticsearch({
        level: FILE_LEVEL,
        indexPrefix: ELASTICSEARCH_INDEXPREFIX,
        handleExceptions: true,
        format: winston.format.json(),
        colorize: false,
        clientOpts: {
            host: ELASTICSEARCH_URL,
            log: [{
                levels: ['error']
            }]
        }
    })
}

const transports = [
    new winston.transports.File({
        level: FILE_LEVEL,
        filename: FILE_NAME,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    }),
    new winston.transports.Console({
        level: CONSOLE_LEVEL,
        handleExceptions: true,
        format: process.env.NODE_ENV === 'production' 
            ? winston.format.combine(
                winston.format.simple())
            : winston.format.combine(
                winston.format.colorize(),
                winston.format.simple())
    })
]

if (IS_ENV_PROD() && ELASTICSEARCH_URL) {
    transports.push(elasticsearch())
}

const partialLogger = new winston.createLogger({
    transports,
    exitOnError: false,
})

partialLogger.stream = {
    write: message => partialLogger.info(message)
}

const createMorgan = () => morgan('combined', { stream: partialLogger.stream })
const logger = merge(partialLogger, { morgan: createMorgan })

module.exports = logger
