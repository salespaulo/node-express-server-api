/**
 * API RESOURCES - index.ts
 * 
 * Exporta uma interface de Api,
 * todos os endpoints da api devem
 * implementar esta interface.
 */
const logger = require('../../log')
const { inspect } = require('../../utils')

const catchError = (res) => {
    return e => {
        const error = e || 'Internal Server Error - 500'
        let msg = 'Error: '

        if (error.response) {
            const req = error.request
            const res = error.response
            const conn = error.request.connection

            msg += `Server respond response.status=${res.status}-${res.statusText}; response.data=${inspect(res.data)}; request.path=${req.path}; request.connection=${conn.localAddress}:${conn.localPort}`
        } else if (error.request) {
            const req = error.request
            const conn = req.connection
            msg += `Server not respond request.path=${req.path}; request.connection=${conn.localAddress}:${conn.localPort}`
        } else if (error.message) {
            msg += `Request not setup message=${error.message}`
        } else {
            msg += inspect(error)
        }

        logger.error(msg)
        res.status(500).json({ message: msg })
    }
}

const catchNotFoundError = (resource, id, res) => {
    res.status(404).json([
        {
            type: 'not_found',
            field: 'id',
            message: `${ resource } ${ id } not found!`
        }
    ])
}

export {
    catchError,
    catchNotFoundError
}
