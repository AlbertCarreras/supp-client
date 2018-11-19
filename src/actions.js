//CONSTANTS
import {API_ROOT} from './Adapters/AdapterConstants'
import AdapterUser from './Adapters/AdapterUser';

//TYPES
import {
    JWT, LOGIN, 
    LOGOUT,
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS, UPDATE_ACTIVE_CLOSEST_USERS,
    SAVE_USER_INTERESTS,
    SAVE_FILTERED_CLOSEST_USERS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS,
    SAVE_CONVERSATIONS, SAVE_SELECTED_CONVERSATION, CLEAN_SELECTED_CONVERSATION, APPEND_NEW_CONVERSATION,
    ADD_ERROR_MESSAGE, CLEAN_ERROR_MESSAGES,
} from './types';

//REDUX-THUNK actions
// Login, currentGeolocation and closestUsers happen sequentially.
export const thunkLogin = () => {

    return (dispatch) => {
        console.log("thunk action")
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

export const thunkSaveClosestUsers = () => {

    return (dispatch) => {
        console.log("thunk closest users action")
        fetch(`${API_ROOT}/users`, {
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
        .catch(() => console.log("No closest users yet"))
    }
}

export const thunkPersistCurrentGeolocation = (userId, latitude, longitude) => {

    return (dispatch) => {
        console.log("thunk save location")
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

// When an interest is selected, an array with users matching that interest gets returned.
export const thunkSaveFilteredClosestUsers = (filterTermId) => {

    return (dispatch) => {
        console.log("thunk filter friends")
        fetch(`${API_ROOT}/users`, {
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
        console.log("thunk pic upload")
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
        console.log("thunk update profile info")
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

// Users add interests from list persisting changes.
export const thunkSaveUserInterests = (userId, userInterests) => {

    let bodyPersistAddInterests = {"user": {
        "interests": userInterests
      }};

    return (dispatch) => {
        console.log("thunk user interests")
        fetch(`${API_ROOT}/user/${userId}/interests`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyPersistAddInterests)
        })
        .then(resp=>resp.json())
        .then(resp => dispatch( { 
            type: SAVE_USER_INTERESTS,
            payload: {
                userInterestArray: resp.interests,
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

// Users remove interests from list persisting changes.
export const thunkRemoveUserInterests = (userInterests) => {
    
    let bodyPersistRemoveInterests = {"user": {
        "interests": userInterests
      }};

    return (dispatch) => {
        console.log("thunk user interests")
        fetch(`${API_ROOT}/user_interests/${userInterests.id}`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyPersistRemoveInterests)
        })
        .then(resp=>resp.json())
        .then(resp => dispatch( { 
            type: SAVE_USER_INTERESTS,
            payload: {
                userInterestArray: resp.interests,
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

// Users start a new conversation. Conversations get persisted and broadcasted from server.
export const thunkSaveConversations = () => {
    
    return (dispatch) => {
        console.log("thunk user conversations")
        fetch(`${API_ROOT}/conversations`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp=>resp.json())
        .then(resp => dispatch( { 
            type: SAVE_CONVERSATIONS,
            payload: {
                conversations: resp,
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

// If users look for  word that does not exist yet in the database, they can click on the new word an persisted.
export const thunkCreateNewWord = (userId, newTerm) => {
    
    return (dispatch) => {
        console.log("thunk new word")
        fetch(`${API_ROOT}/interests/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
            body: JSON.stringify({
                "interest": {
                    "newTerm": newTerm,
                }
            })
        })
        .then(resp => resp.json())
        .then(resp => dispatch(
            thunkSaveUserInterests(userId, resp)
        ))
        .catch(() => {
            dispatch( { 
                type: ADD_ERROR_MESSAGE,
                payload: {
                    key: "unauthorizedToken",
                    value: "Sorry, there was an error processing the information. Please, log in again.",
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

export function saveSelectedConversation(selectedConversation) {
    return {
        type: SAVE_SELECTED_CONVERSATION,
        payload: {
            selectedConversation: selectedConversation,
        }
    }
}

export function cleanSelectedConversation() {
    return {
        type: CLEAN_SELECTED_CONVERSATION,
    }
}

export function saveUpdatedConversations(conversations) {
    return {
        type: SAVE_CONVERSATIONS,
        payload: {
            conversations: conversations,
        }
    }
}

export function appendNewConversation(receivedNewConversation) {
    return {
        type: APPEND_NEW_CONVERSATION,
        payload: {
            receivedNewConversation: receivedNewConversation,
        }
    }
}

export function updateClosestUsers(closestUsers) {
    return {
        type: UPDATE_ACTIVE_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
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