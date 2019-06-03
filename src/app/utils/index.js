
const objects = require('./objects')
const arrays = require('./arrays')

const IS_ENV_DEV = () => process.env.NODE_ENV === 'development'
const IS_ENV_LOCAL = () => process.env.NODE_ENV === 'localhost-development'
const IS_ENV_PROD = () => process.env.NODE_ENV === 'production'

module.exports = {
    ...objects,
    ...arrays,
    IS_ENV_DEV,
    IS_ENV_LOCAL,
    IS_ENV_PROD
}
