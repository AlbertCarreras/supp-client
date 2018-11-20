//CONSTANTS
import {API_ROOT} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterUser';

//TYPES
import {
    LOGOUT,
    SAVE_PROFILE, 
    SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION,
    ADD_ERROR_MESSAGE
} from './../types';

//REDUX-THUNK actions
export const thunkPersistCurrentGeolocation = (userId, latitude, longitude) => {

    return (dispatch) => {
        fetch(`${API_ROOT}/user/${userId}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "user": {
                    "last_location_lat": latitude,
                    "last_location_lon": longitude,
                }})
        })
        .then(r=>r.json())
        .then(resp => dispatch({ 
            type: SAVE_CURRENT_GEOLOCATION,
            payload: {
                lat: resp.lat,
                lon: resp.lon,
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

// Users update profile photo and text.
export const thunkUploadProfile = (userId, profileImage) => {

    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('profile_image', profileImage);
    
    return (dispatch) => {
        fetch(`${API_ROOT}/users/uploadProfile`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
            body: formData
            })
        .then(resp=>resp.json())
        .then(resp => dispatch( { 
            type: SAVE_PROFILE_IMAGE,
            payload: {
                profileImageLink: resp.url,
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

export const thunkUpdateProfileInfo = (userId, username, bio) => {

    let bodyUpdateProfileInfo = {"user": {}};
    
    if (username) {
      bodyUpdateProfileInfo = Object.assign({}, bodyUpdateProfileInfo, {"user": {
        ...bodyUpdateProfileInfo.user,
        "username": username
      }
    })} 

    if (bio) {
      bodyUpdateProfileInfo = Object.assign({}, bodyUpdateProfileInfo, {"user": {
        ...bodyUpdateProfileInfo.user,
        "bio": bio
      }
    })}
    
    return (dispatch) => {
        fetch(`${API_ROOT}/user/${userId}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyUpdateProfileInfo)
            })
        .then(resp=>resp.json())
        .then(() => dispatch( { 
            type: SAVE_PROFILE,
            payload: {
                username: username,
                bio: bio,
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