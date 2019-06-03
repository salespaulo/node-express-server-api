
const { inspect } = require('../../utils')
const logger = require('../../log')

const CAN_LOG = process.env.LOG_TEST || false

const catchError = (err, done) => {
    log('ERROR', err)
    logger.crit(`[UNIT TEST]:\nERROR:\n${inspect(err)}`)
    done(`Error executing test error: ${ inspect(err) }`)
}

const log = (msg = '', obj = {}) => {
    if (CAN_LOG) console.log(`\t\t >>>>>: [TEST LOG] : MSG: ${msg}; OBJ: ${inspect(obj)}`)
}

module.exports = { 
    catchError,
    log
}