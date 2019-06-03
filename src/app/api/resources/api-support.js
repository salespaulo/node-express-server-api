/**
 * Modulo que configura as rotas de suporte para
 * testarmos o servidor api.
 */
const express = require('express')

const URI = '/support'
const router = express.Router()

router.get('/health', async (_req, res, _next) => {
    return res.json({
        health: 'OK'
    })
})

router.get('/ping', (_req, res, _next) => {
    res.json({ result: 'pong' })
})

router.get('/echo/:echo', (req, res, _next) => {
    res.json({ result: req.params.echo })
})

/**
 * 
 * @param server  
 * @returns
 */
module.exports = server => server.use(URI, router)