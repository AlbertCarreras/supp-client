//CONSTANTS
import {API_ROOT} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterUser';

//TYPES
import {
    JWT, 
    LOGIN, 
    LOGOUT,
    ADD_ERROR_MESSAGE,
    CLEAN_ERROR_MESSAGES
} from './../types';

//REDUX-THUNK actions
// Login, currentGeolocation and closestUsers happen sequentially.
export const thunkLogin = () => {

    return (dispatch) => {
        fetch(`${API_ROOT}/user/auth`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
        .then(r=> r.json())
        .then(resp => dispatch( { 
            type: LOGIN,
            payload: {
                username: resp.username,
                email: resp.email,
                userId: resp.id,
                bio: resp.bio === null ? "" : resp.bio,
                loggedIn: true,
                userInterests: resp.userInterests,
                profileImageLink: resp.profile_image,
                prevGeolocationLat: resp.lat, 
                prevGeolocationLon: resp.lon, 
            }
        }))
        .catch(() => {
            dispatch( { 
                type: ADD_ERROR_MESSAGE,
                payload: {
                    key: "unauthorizedToken",
                    value: "Unauthorized credentials. Please, log in again.",
                }
            })
            AdapterUser.deleteToken();
            return dispatch( { 
            type: LOGOUT,
        })})
    }
}

//REDUX actions
export function jwtSavedInLocalStorage() {
    return {
        type: JWT,
    }
}
  
export function logout() {
    return {
        type: LOGOUT,
    }
}

export function addErrorMessage(key, value) {
    return {
        type: ADD_ERROR_MESSAGE,
        payload: {
            key: key,
            value: value,
        }
    }
}

export function cleanErrorMessages() {
    return {
        type: CLEAN_ERROR_MESSAGES,
        payload: {
            errorMessages: {},
        }
    }
}