function sendResponse(status, meassage, data = null, token = null){

const responseData = {
    status: status,
    meassage: meassage,
    data: data,
    token: token
}

 return responseData
}
module.exports = sendResponse