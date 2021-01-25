import axios from "axios";
import {
    ApiHelper,
    API_DEFAULT_URL
} from "./base"


function changeUserName (userName: string, access_token: string, callback, errorCallback) {
    let body = {
        name: userName
    }

    let headers = {
        Authorization: access_token
    }

    axios.patch(API_DEFAULT_URL + "/users", body, {headers: headers}).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}


export {
    changeUserName
}