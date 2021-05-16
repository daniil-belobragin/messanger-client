import axios from "axios"
import {
    API_DEFAULT_URL,
    ApiHelper
} from "./base";


function createRoom(roomName: string, userId: string, callback: any, errorCallback: any) {
    let body = {
        name: roomName,
        creator: userId
    }

    axios.post(API_DEFAULT_URL + '/rooms/create', body).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}


function deleteRoom(roomName: string, callback: any, errorCallback: any) {
    axios.delete(API_DEFAULT_URL + '/rooms/' + roomName).then((response) => {
        ApiHelper.handleResponse(response, callback)
    }).catch((error) => {
        ApiHelper.handleErrorResponse(error, errorCallback)
    })
}

export {
    createRoom,
    deleteRoom
}