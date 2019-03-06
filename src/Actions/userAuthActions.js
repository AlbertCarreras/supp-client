//CONSTANTS
import {config} from './../Adapters/AdapterConstants'

//TYPES
import {
    JWT, 
    LOGIN, 
    LOGOUT,
    ADD_ERROR_MESSAGE,
    CLEAN_ERROR_MESSAGES
} from './../types';

//REDUX-THUNK actions with ASYNC/AWAIT
// Login, currentGeolocation and closestUsers happen sequentially.
export const thunkLogin = () => {

    return async function (dispatch) {

        let response = await fetch(`${config.url.API_ROOT}/user/auth`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })

        let responseJSON = await response.json()
        
        let dispatchLogin = (resp) => {
            dispatch( { 
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
            }) 

            window.Appcues.identify(`${resp.id}`, {
                name: resp.username,
                email: resp.email
            })
        }

        return dispatchLogin( responseJSON )
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