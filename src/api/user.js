import axios from "axios"
import {
    API_DEFAULT_URL,
    ApiHelper
} from "./base";


function createUser(userName, iconColor, callback, errorCallback) {
    let body = {
        name: userName,
        icon_color: iconColor
    }

    axios.post(API_DEFAULT_URL + '/users/create', body).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}


function deleteUser(userId, callback, errorCallback) {
    axios.delete(API_DEFAULT_URL + '/users/' + userId).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}

export {
    createUser,
    deleteUser
}