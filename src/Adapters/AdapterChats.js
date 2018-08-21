// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'
import {AUTH_HEADERS_IMAGE} from './AdapterConstants'

class AdapterChats {

    static getConversations(){
        return fetch(`${API_ROOT}/conversations`, {
            method: 'GET',
            headers: AUTH_HEADERS_IMAGE
        })
        .then(res => res.json())
    }

    static  fetchToWebsocket(route, bodyData) {
        fetch(`${API_ROOT}/${route}`, {
            method: 'POST',
            headers: AUTH_HEADERS_JSON,
            body: JSON.stringify(bodyData)
        })
    }        
}

export default AdapterChats;