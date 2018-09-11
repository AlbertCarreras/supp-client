// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {AUTH_HEADERS_JWT} from './AdapterConstants'

class AdapterChats {

    //Request user conversation from server. 
    static getConversations(){
        return fetch(`${API_ROOT}/conversations`, {
            method: 'GET',
            headers: AUTH_HEADERS_JWT
        })
        .then(res => res.json())
    }

    //Fetch new conversation or message to server. route will be "conversation" or "message" determining the server route 
    static  fetchToWebsocket(route, bodyData) {
        fetch(`${API_ROOT}/${route}`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
            body: JSON.stringify(bodyData)
        })
    }        
}

export default AdapterChats;