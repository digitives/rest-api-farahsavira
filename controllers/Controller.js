/* 
 * This project is licensed to Kodesayap Inc
 * You can contribute to make this project better by contact me.
 * Please contact me via Phone +6282302021799.
 * Your Regards,Andika Leonardo, s.kom
 */

const { toJson } = require('../helpers/Result')
const UserService = require('../services/Services')

const actiongetcekdptonline = async(req, reply) => {
    const { nik } = req.body
    const getOnline = await UserService.getCekDptOnline(nik)
    if(getOnline == '404'){
        return toJson(reply, 404, "Data TIdak Ditemukan", [])
    }
    if(getOnline == '500'){
        return toJson(reply, 500, "Website Down", [])
    }
    return toJson(reply, 200, "Berhasil", getOnline)
}

module.exports = {
    actiongetcekdptonline,
}