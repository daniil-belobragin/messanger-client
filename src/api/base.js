const API_DEFAULT_PROTOCOL = 'https://'
const API_HOST = 'api.daniil-belobragin.work'

const SOCKETS_DEFAULT_PROTOCOL = 'https://'
const SOCKETS_HOST = 'api.daniil-belobragin.work'

const API_DEFAULT_URL = API_DEFAULT_PROTOCOL + API_HOST
const SOCKETS_DEFAULT_URL = SOCKETS_DEFAULT_PROTOCOL + SOCKETS_HOST

class ApiResponse {
    data
    code
    executed

    constructor() {
        this.data = null
        this.code = null
        this.executed = true
    }
}


class ApiHelper {

    static handleResponse(response, callback) {
        let mResponse = new ApiResponse()
        mResponse.data = response.data
        mResponse.code = response.status

        callback(mResponse)
    }

    static handleErrorResponse(error, errorCallback) {
        let mResponse = new ApiResponse()

        if (!error.response) {
            mResponse.executed = false
            errorCallback(mResponse)
            return
        }
        mResponse.data = error.response.data.error
        mResponse.code = error.response.status

        errorCallback(mResponse)
    }
}

export {
    API_DEFAULT_URL,
    SOCKETS_DEFAULT_URL,
    ApiHelper
}