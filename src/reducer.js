import {LOGIN, LOGOUT, SAVE_PROFILE} from './types';

//Default App State - REDUX
const initialState = {
    username: "",
    email: "",
    userId: 0,
    loggedIn: false,
    bio: "",
  }
  
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.userId,
                loggedIn: true
            }
        case LOGOUT:
            return { ...state,
                username: "",
                userId: null,
                loggedIn: false
            }
        case SAVE_PROFILE:
            return { ...state,
                username: "",
                bio: ""
            }
        default:
            return state;
    }
}