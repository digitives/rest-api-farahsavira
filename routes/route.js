const TestController = require('../controllers/Controller')


async function routes(fastify, options) {
    fastify.post('/cekdptonline', TestController.actiongetcekdptonline)
}

module.exports = routes;