import {
    JWT, 
    LOGIN,
    LOGOUT_AUTH, 
    ADD_ERROR_MESSAGE, 
    CLEAN_ERROR_MESSAGES,
} from '../types';
  
import initialState from './state';
  
export default function userAuthReducer(state = initialState, action) {
    switch(action.type) {
        case JWT: {
            return { ...state,
                jwtToken: true,
            }
        }
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                bio: action.payload.bio,
                profileImageLink: action.payload.profileImageLink,
                prevGeolocationLat: action.payload.prevGeolocationLat, 
                prevGeolocationLon: action.payload.prevGeolocationLon,
                loggedIn: true,
                userInterests: action.payload.userInterests,
                selectedCommonInterest: action.payload.selectedCommonInterest,
            }
        case LOGOUT_AUTH:
            return { ...state,
                jwtToken: false,
                username: "",
                email: "",
                userId: null,
                loggedIn: false,
                bio: "",
                profileImageLink: undefined,
                lat: undefined,
                lon: undefined,
                prevGeolocationLat: undefined,
                prevGeolocationLon: undefined,
                userInterests: [],
                closestUsers: [],
                selectedCommonInterest: undefined,
                conversations: [],
                selectedConversation: undefined,            
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