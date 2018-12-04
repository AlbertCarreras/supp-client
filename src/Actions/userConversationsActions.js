//CONSTANTS
import {config} from './../Adapters/AdapterConstants'
import AdapterUser from './../Adapters/AdapterUser';

//TYPES
import {
    LOGOUT,
    SAVE_CONVERSATIONS, 
    SAVE_SELECTED_CONVERSATION, 
    CLEAN_SELECTED_CONVERSATION, 
    APPEND_NEW_CONVERSATION,
    ADD_ERROR_MESSAGE
} from './../types';

//REDUX-THUNK actions
// Users start a new conversation. Conversations get persisted and broadcasted from server.
export const thunkSaveConversations = () => {
    
    return (dispatch) => {
        fetch(`${config.url.API_ROOT}/conversations`, {
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

//REDUX actions
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
    console.log("appending one")
    return {
        type: APPEND_NEW_CONVERSATION,
        payload: {
            receivedNewConversation: receivedNewConversation,
        }
    }
}