/* 
 * This project is licensed to Kodesayap Inc
 * You can contribute to make this project better by contact me.

 * Your Regards,Andika Leonardo, s.kom
 */
const multer = require('fastify-multer') // or import multer from 'fastify-multer'
const upload = multer({ dest: 'uploads/' })

const fastify = require('fastify')({ logger: true })
const test = require('./routes/route')
fastify.register(multer.contentParser)

fastify.register(require('fastify-cors'), { 
    'origin': '*', 
    'methods': 'POST' 
})
fastify.register(test, { prefix: '/api/' })


module.exports = fastify