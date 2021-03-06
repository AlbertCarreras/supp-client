import {
    JWT, 
    LOGIN,
    ADD_ERROR_MESSAGE, 
    CLEAN_ERROR_MESSAGES,
} from '../types';
  
const initialState = {
    jwtToken: false,
    email: "",
    userId: null,
    loggedIn: false,
    errorMessages: {}
}

export default function userAuthReducer(state = initialState, action) {
    switch(action.type) {
        case JWT: {
            return { ...state,
                jwtToken: true,
            }
        }
        case LOGIN:
            return { ...state,
                email: action.payload.email,
                userId: action.payload.userId,
                loggedIn: true,
            }

        case ADD_ERROR_MESSAGE:  
            return { ...state,
                // errorMessages: Object.assign({}, state.errorMessages, {[action.payload.key]: action.payload.value}),
                errorMessages: {...state.errorMessages, [action.payload.key]: action.payload.value},
            }

        case CLEAN_ERROR_MESSAGES:
            return { ...state,
                errorMessages: {},
            }
  
        default:
            return state;
    }
}