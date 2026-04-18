function createError(status, meassage){
const error = new Error()
error.status = status;
error.meassage = meassage;

return error
}
module.exports = createError
