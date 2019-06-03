
const logger = require('../log')

const util = require('util')
const moment = require('moment')
const Option = require('option-js')

const _logtag = tag => option(tag).orElse(moment().toISOString())

const debugIt = (obj, tag = null) => {
    logger.debug(`OBJECT LOG ${_logtag(tag)}: ${inspect(obj)}`)
    return obj
}

const merge = (obj, toMerge) => Object.assign(obj, toMerge)

const json = obj => JSON.stringify(obj)

const inspect = obj => util.inspect(obj, false, null)

const option = value => Option.of(value)

module.exports = { merge, json, inspect, option, debugIt }