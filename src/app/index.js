/**
 * Módulo que exporta a biblioteca
 */
const express = require('express')
const logger = require('node-winston-logging')

const api = require('./api')
const server = require('./server')

/** Init Server Method */
const init = () => {
    logger.debug(`Server Init in NODE_ENV: ${process.env.NODE_ENV}`)
    return express()
}

/** Exports Server API  */
module.exports = (config = false) => server(init(), config).map(api)
