// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'

class Adapters {

    //NAMING
    static  capitalize(term) {
        return term.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    }

    static usernameShortFormat(username) {
        return Adapters.capitalize(username).split(" ")[0].substring(0, 9)
    }

    static usernameLongFormat(username) {
        return username.split(" ").map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(" ")
    }

     //API DATA
    static  getClosestUsers() {
        return fetch(`${API_ROOT}/users`, {
            method: 'GET',
            headers: AUTH_HEADERS_JSON
        })
        .then(resp => resp.json())
    }


    static  getSearchMatches(searchTerm) {
        return fetch(`${API_ROOT}/searchInterests`, {
            method: 'POST',
            headers: AUTH_HEADERS_JSON,
            body: JSON.stringify({
                "search": {
                  "searchTerm": searchTerm.toLowerCase(),
                }
            })
        })
        .then(resp => resp.json())
    }
    
}
export default Adapters;
