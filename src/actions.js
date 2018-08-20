//TYPES
import {
    JWT, LOGIN, LOGOUT, 
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS,
    SAVE_USER_INTERESTS, REMOVE_USER_INTERESTS,
    SAVE_FILTERED_CLOSEST_USERS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS,
} from './types';

//REDUX-THUNK
export const thunkLogin = () => {
    console.log(localStorage.getItem("token"))
    return (dispatch) => {
        console.log("thunk action")
        fetch(`http://localhost:3000/api/v1/user/auth`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
          })
        .then(r=>r.json())
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
    }
}

export const thunkSaveClosestUsers = () => {
    console.log(localStorage.getItem("token"))
    return (dispatch) => {
        console.log("thunk closest users action")
        fetch(`http://localhost:3000/api/v1/users`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
        })
        .then(r=>r.json())
        .then(resp => dispatch( { 
            type: SAVE_CLOSEST_USERS,
            payload: {
                closestUsers: resp,
            }
        }))
    }
}

export const thunkPersistCurrentGeolocation = (userId, latitude, longitude) => {
    console.log(localStorage.getItem("token"))
    return (dispatch) => {
        console.log("thunk save location")
        fetch(`http://localhost:3000/api/v1/user/${userId}`, {
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
            }
        }))
    }
}

export const thunkSaveFilteredClosestUsers = (filterTermId) => {
    console.log(localStorage.getItem("token"))
    return (dispatch) => {
        console.log("thunk filter friends")
        fetch(`http://localhost:3000/api/v1/users`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "filter": {
                  "filterId": filterTermId,
                }
            })
        })
        .then(r=>r.json())
        .then(resp => dispatch( { 
            type: SAVE_FILTERED_CLOSEST_USERS,
            payload: {
                closestUsers: resp,
            }
        }))
    }
}


//REDUX
export function jwtSavedInLocalStorage() {
    return {
        type: JWT,
    }
}

//to be deleted
// export function login(username, email, userId, bio, userInterests=[], profileImageLink=`/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`, prevGeolocationLat, prevGeolocationLon) {
//     return {
//         type: LOGIN,
//         payload: {
//             username: username,
//             email: email,
//             userId: userId,
//             bio: bio,
//             loggedIn: true,
//             userInterests: userInterests,
//             profileImageLink: profileImageLink,
//             prevGeolocationLat: prevGeolocationLat, 
//             prevGeolocationLon: prevGeolocationLon, 
//         }
//     }
// }
  
export function logout() {
    return {
        type: LOGOUT,
    }
}

export function saveProfile(username, bio) {
    return {
        type: SAVE_PROFILE,
        payload: {
            username: username,
            bio: bio,
        }
    }
}

export function saveProfileImage(profileImageLink) {
    return {
        type: SAVE_PROFILE_IMAGE,
        payload: {
            profileImageLink: profileImageLink,
        }
    }
}

export function saveCurrentGeolocation(lat, lon) {
    return {
        type: SAVE_CURRENT_GEOLOCATION,
        payload: {
            lat: lat,
            lon: lon,
        }
    }
}

export function saveFilteredClosestUsers(closestUsers) {
    return {
        type: SAVE_FILTERED_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
    }
}

//to be deleted
export function saveClosestUsers(closestUsers) {
    return {
        type: SAVE_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
    }
}

export function selectCommonInterests(selectedCommonInterest) {
    return {
        type: SELECT_COMMON_INTERESTS,
        payload: {
            selectedCommonInterest: selectedCommonInterest,
        }
    }
}

export function unselectCommonInterests() {
    return {
        type: UNSELECT_COMMON_INTERESTS,
    }
}

export function saveUserInterests(userInterestArray) {
    return {
        type: SAVE_USER_INTERESTS,
        payload: {
            userInterestArray: userInterestArray,
        }
    }
}

export function removeUserInterests(selectedUserInterest) {
    return {
        type: REMOVE_USER_INTERESTS,
        payload: {
            selectedUserInterest: selectedUserInterest,
        }
    }
}