 class ApiError extends  Error{

    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    BAD_REQUEST(message) {
        return new ApiError(404, message)
    }

     INTERNAL_ERROR(message) {
        return new ApiError(500, message)
    }

     FORBIDEN(message) {
        return new ApiError(403, message)
    }

     UNAUTHORIZED(message) {
         return new ApiError(401, message)
     }

}

module.exports = new ApiError