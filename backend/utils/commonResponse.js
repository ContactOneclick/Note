/**
 * Success Respones Success Helper function
 * @param {object} res Express response object 
 * @param {object} data Response json object
 * @param {string} message human readable messages
 */
exports.successResponse = function successResponse(res, data, message) {
    const response = {
        success: 1,
        data: data,
        message: message,
        status: 200
    }
    return res.status(200).json(response)
}
/**
 * Success Respones Error Helper function
 * @param {object} res Express response object 
 * @param {object} errors Response json object
 * @param {string} message human readable messages
 * @param {int} status http status code
 */

exports.errorResponse = function errorResponse(res, errors, message, status) {
    const response = {
        success: 0,
        data: {},
        errors: errors,
        message: message,
        status: status
    }
    return res.status(status).json(response)
}