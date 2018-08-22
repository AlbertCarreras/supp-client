// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {API_SHORT_ROOT} from './AdapterConstants'
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

    //DISTANCE
    static  getReadableDistance(dist) {
        
        if (dist !== undefined) {
            return dist < 1 
            ? `${(dist * 5280).toFixed(1)} ft`
            : `${(dist).toFixed(1)} mi`
        }
        else {
            return null
        }
        
    }

    //IMAGE URL STANDARIZER
    static  getStandardImageUrl(apiUrl) {
        if (apiUrl.substring(0, 6) === "/rails") {
            return `${API_SHORT_ROOT+apiUrl}`
        }
        return apiUrl
    }


     //API DATA
    static  getSearchMatches(searchTerm) {
        return fetch(`${API_ROOT}/interests`, {
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
