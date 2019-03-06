//CONSTANTS
import {config} from './../Adapters/AdapterConstants'
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

    return async function (dispatch) {

        try {
            let response = await fetch(`${config.url.API_ROOT}/user/${userId}/interests`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bodyPersistAddInterests)
            })
    
            let responseJSON = await response.json()
    
            let  dispatchSaveUserInterests = (resp) => dispatch( { 
                type: SAVE_USER_INTERESTS,
                payload: {
                    userInterestArray: resp.interests,
                }
            })
    
            return dispatchSaveUserInterests(responseJSON)    

        } catch (err) {
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
            })
        }  
    }     
}

// Users remove interests from list persisting changes.
export const thunkRemoveUserInterests = (userInterests) => {
    
    let bodyPersistRemoveInterests = {"user": {
        "interests": userInterests
      }};

    return async function (dispatch)  {
        try {

            let response = await fetch(`${config.url.API_ROOT}/user_interests/${userInterests.id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bodyPersistRemoveInterests)
            })

            let responseJSON = await response.json()
            
            let dispatchRemoveUserInterests = (resp) => dispatch( { 
                type: SAVE_USER_INTERESTS,
                payload: {
                    userInterestArray: resp.interests,
                }
            })

            return dispatchRemoveUserInterests(responseJSON)

        } catch (err) {
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
            })
        }
    }
}

// If users look for  word that does not exist yet in the database, they can click on the new word an persisted.
export const thunkCreateNewWord = (userId, newTerm) => {
    
    return async function(dispatch) {
        try {
            let response = fetch(`${config.url.API_ROOT}/interests/create`, {
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

            let responseJSON = await response.json()

            let dispatchCreateNewWord = (resp) => dispatch(
                thunkSaveUserInterests(userId, resp)
            )

            return dispatchCreateNewWord(responseJSON)

        } catch (err) {
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
            })
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