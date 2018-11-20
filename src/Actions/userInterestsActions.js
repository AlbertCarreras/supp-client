//CONSTANTS
import {API_ROOT} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterUser';

//TYPES
import {
    LOGOUT,
    SAVE_USER_INTERESTS,
    SELECT_COMMON_INTERESTS, 
    UNSELECT_COMMON_INTERESTS,
    ADD_ERROR_MESSAGE
} from './../types';

//REDUX-THUNK actions
// Users add interests from list persisting changes.
export const thunkSaveUserInterests = (userId, userInterests) => {

    let bodyPersistAddInterests = {"user": {
        "interests": userInterests
      }};

    return (dispatch) => {
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

// If users look for  word that does not exist yet in the database, they can click on the new word an persisted.
export const thunkCreateNewWord = (userId, newTerm) => {
    
    return (dispatch) => {
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