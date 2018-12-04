// ADAPTERS
import {config} from './AdapterConstants'
import {AUTH_HEADERS_JSON_JWT} from './AdapterConstants'

class Adapters {

    //NAMING
    // Return name with each words capitalized
    static  capitalize(term) {
        return term.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    }
    
    // Return first name capitalized up to 9 characters
    static usernameShortFormat(username) {
        return Adapters.capitalize(username).split(" ")[0].substring(0, 9)
    }

    //DISTANCE
    // Return human-readable distance in feet or miles
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
    // Return random avatar image
    static  getNotPicAvatar() {
        return config.route.GITHUB_URL_ROOT+`/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
    }
    
    // Check if url to profile image exists. If undefined, return avatar image. If valid url, return full server url.
    static  getStandardImageUrl(apiUrl) {
        if (apiUrl === "undefined") {
            return Adapters.getNotPicAvatar()
        }
        else if (apiUrl === undefined) {
            return Adapters.getNotPicAvatar()
        }
        else if (apiUrl.substring(0, 6) === "/rails") {
            return `${config.url.API_SHORT_ROOT+apiUrl}`
        }
        return apiUrl
    }


     //API DATA
     // Fetch interest search input and return server response.
    static  getSearchMatches(searchTerm) {
        return fetch(`${config.url.API_ROOT}/interests`, {
            method: 'POST',
            headers: AUTH_HEADERS_JSON_JWT,
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
