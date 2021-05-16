const API_DEFAULT_PROTOCOL: string = 'http://'
const API_HOST: string = 'localhost:2020'

const SOCKETS_DEFAULT_PROTOCOL = 'http://'
const SOCKETS_HOST = 'localhost:2020'

const API_DEFAULT_URL: string = API_DEFAULT_PROTOCOL + API_HOST
const SOCKETS_DEFAULT_URL: string = SOCKETS_DEFAULT_PROTOCOL + SOCKETS_HOST

class ApiResponse {
    data: any
    code: number
    executed: boolean

    constructor() {
        this.data = null
        this.code = NaN
        this.executed = true
    }
}


class ApiHelper {

    static handleResponse(response: any, callback: any) {
        let mResponse = new ApiResponse()
        mResponse.data = response.data
        mResponse.code = response.status

        callback(mResponse)
    }

    static handleErrorResponse(error: any, errorCallback: any) {
        let mResponse = new ApiResponse()

        if (!error.response) {
            mResponse.executed = false
            errorCallback(mResponse)
            return
        }
        mResponse.data = error.response.data
        mResponse.code = error.response.status

        errorCallback(mResponse)
    }
}


export {
    SOCKETS_DEFAULT_URL,
    API_DEFAULT_URL,
    ApiHelper
}