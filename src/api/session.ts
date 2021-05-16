import {ApiHelper} from "./base";
import {axiosInstance} from "./api";


function signUp(userName: string, email: string, password: string, repeatPassword: string, callback: any,
                errorCallback: any) {
    let body = {
        name: userName,
        email: email,
        password: password,
        repeatPassword: repeatPassword
    }

    axiosInstance.post( "/signup", body).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}

function signIn(email: string, password: string, callback: any, errorCallback: any) {
    let body = {
        email: email,
        password: password
    }

    axiosInstance.post("/signin", body).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}

function refresh(refresh_token: string, callback: any, errorCallback: any) {

    let headers = {
        Authorization: refresh_token
    }

    axiosInstance.post( "/refresh", null, {headers: headers}).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}


export {
    signUp,
    signIn,
    refresh
}