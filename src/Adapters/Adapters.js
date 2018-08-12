
// ADAPTERS
import {API} from './AdapterUser'
import AdapterUser from './AdapterUser';

class Adapters {

    //NAMING
    static  capitalize(term) {
        return term.charAt(0).toUpperCase() + term.slice(1)
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
            headers: {
                'Authorization': `Bearer ${AdapterUser.getToken()}`
            }
        })
        .then(resp => resp.json())
    }

    static  getSearchMatches(searchTerm) {
        return fetch(`${API}/searchInterests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AdapterUser.getToken()}`
            },
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
