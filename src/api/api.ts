import axios from "axios";

import {API_DEFAULT_URL} from "./base"
import {refresh} from "./session";
import {SessionManager} from "@/util/session";


const axiosInstance = axios.create({baseURL: API_DEFAULT_URL})

axiosInstance.interceptors.response.use((response) => {
    return response
}, (error: any) => {
    if (error.response.status === 401) {
        refresh(SessionManager.getSession().refreshToken, (response: any) => {
            SessionManager.refreshSession(response.data.data.access_token, response.data.data.refresh_token)
        }, () => {
            SessionManager.logOut()
        })
    }
    return Promise.reject(error)
})


export {
    axiosInstance
}