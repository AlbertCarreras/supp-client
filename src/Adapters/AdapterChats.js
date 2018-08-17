// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'

class AdapterChats {

    static  fetchToWebsocket(route, bodyData) {
        debugger
        fetch(`${API_ROOT}/${route}`, {
            method: 'POST',
            headers: AUTH_HEADERS_JSON,
            body: JSON.stringify(bodyData)
        })
    }        
}

export default AdapterChats;