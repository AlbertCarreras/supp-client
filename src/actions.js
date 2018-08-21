//TYPES
import {
    JWT, LOGIN, LOGOUT, 
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS,
    SAVE_USER_INTERESTS,
    SAVE_FILTERED_CLOSEST_USERS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS,
    SAVE_CONVERSATIONS, SAVE_SELECTED_CONVERSATION, APPEND_NEW_CONVERSATION,
} from './types';

//REDUX-THUNK
export const thunkLogin = () => {

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

export const thunkUploadProfile = (userId, profileImage) => {

    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('profile_image', profileImage);
    
    return (dispatch) => {
        console.log("thunk pic upload")
        fetch(`http://localhost:3000/api/v1/users/uploadProfile`, {
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
        fetch(`http://localhost:3000/api/v1/user/${userId}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bodyUpdateProfileInfo)
            })
        .then(resp=>resp.json())
        .then(resp => dispatch( { 
            type: SAVE_PROFILE,
            payload: {
                username: username,
                bio: bio,
            }
        }))
    }
}

export const thunkSaveUserInterests = (userId, userInterests) => {

    let bodyPersistAddInterests = {"user": {
        "interests": userInterests
      }};

    return (dispatch) => {
        console.log("thunk user interests")
        fetch(`http://localhost:3000/api/v1/user/${userId}/interests`, {
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
    }
}

export const thunkRemoveUserInterests = (userInterests) => {
    
    let bodyPersistRemoveInterests = {"user": {
        "interests": userInterests
      }};

    return (dispatch) => {
        console.log("thunk user interests")
        fetch(`http://localhost:3000/api/v1/user_interests/${userInterests.id}`, {
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
    }
}

export const thunkSaveConversations = () => {
    
    return (dispatch) => {
        console.log("thunk user conversations")
        fetch(`http://localhost:3000/api/v1/conversations`, {
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
    }
}

//REDUX
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