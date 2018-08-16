// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'

class AdapterLocation {

    static  persistCurrentGeolocation(userId, latitude, longitude) {
        debugger
        return fetch(`${API_ROOT}/user/${userId}`, {
            method: 'PATCH',
            headers: AUTH_HEADERS_JSON,
            body: JSON.stringify({
                "user": {
                  "last_location_lat": latitude,
                  "last_location_lon": longitude,
                }})
        })
        .then(resp => resp.json())
        }

    static showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                break;
            default:
                return null;
        }
    }
}
export default AdapterLocation;
