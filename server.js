/* 
 * This project is licensed to Kodesayap Inc
 * You can contribute to make this project better by contact me.
 * Please contact me via Phone +6282302021799.
 * Your Regards,Andika Leonardo, s.kom
 */

require('dotenv').config()
const app = require('./app')
app.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`)
})  