//CONSTANTS
import {API_ROOT} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterUser';

//TYPES
import {
    LOGOUT,
    SAVE_CLOSEST_USERS, 
    UPDATE_ACTIVE_CLOSEST_USERS,
    SAVE_FILTERED_CLOSEST_USERS,
    ADD_ERROR_MESSAGE
} from './../types';

//REDUX-THUNK actions
export const thunkSaveClosestUsers = () => {

    return (dispatch) => {
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


// When an interest is selected, an array with users matching that interest gets returned.
export const thunkSaveFilteredClosestUsers = (filterTermId) => {

    return (dispatch) => {
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

export function updateClosestUsers(closestUsers) {
    return {
        type: UPDATE_ACTIVE_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
    }
}