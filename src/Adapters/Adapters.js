// ADAPTERS
import {API} from './AdapterConstants'
import {HEADER_JWT} from './AdapterConstants'
import {HEADER_JWT_JSON} from './AdapterConstants'

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
        return fetch(`${API}/users`, {
            method: 'GET',
            headers: HEADER_JWT
        })
        .then(resp => resp.json())
    }

    static  getFilteredClosestUsers(filterTermId) {
        return fetch(`${API}/users`, {
            method: 'POST',
            headers: HEADER_JWT_JSON,
            body: JSON.stringify({
                "filter": {
                  "filterId": filterTermId,
                }
            })
        })
        .then(resp => resp.json())
    }

    static  getSearchMatches(searchTerm) {
        return fetch(`${API}/searchInterests`, {
            method: 'POST',
            headers: HEADER_JWT_JSON,
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
