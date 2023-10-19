/* 
 * This project is licensed to Kodesayap Inc
 * You can contribute to make this project better by contact me.
 * Please contact me via Phone +6282302021799.
 * Your Regards,Andika Leonardo, s.kom
 */

const toJson = (reply, code, message, data = []) => {
    var metadata = {}

    metadata['code'] = code
    metadata['status'] = generateStatus(code)
    metadata['message'] = message

    var response = {}
    response['data'] = data

    var kdsResponse = {
        metadata,
        response
    }

    var kdsresponse = reply
        .code(code)
        .headers('Content-Type', 'multipart/form-data') 
        .send(kdsResponse)

    return kdsresponse
}

const generateStatus = (code) => {
    switch (code) {
        case 200:
            var status = "OK"
            break
        case 201:
            var status = "ERR_REQUIRED"
            break
        case 404:
            var status = "ERR_NOT_FOUND"
            break
        case 500:
            var status = "ERR_INTERNAL"
            break
        default:
            var status = "UNKNOWN"
            break
    }

    return status
}

module.exports = { toJson }